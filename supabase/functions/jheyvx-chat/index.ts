import { createClient } from "npm:@supabase/supabase-js@2";

const originAllowed = (origin: string) => {
  const configured = Deno.env.get("PORTFOLIO_SITE_ORIGIN") || "https://jheyssun-stack.github.io";
  return origin === configured || origin === "http://localhost:5500" || origin === "http://127.0.0.1:5500";
};

Deno.serve(async (request) => {
  const origin = request.headers.get("origin") || "";
  if (request.method === "OPTIONS") {
    if (!originAllowed(origin)) return new Response("Origin not allowed", { status: 403 });
    return new Response("ok", { headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Vary": "Origin"
    }});
  }
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": origin, "Vary": "Origin" };
  if (!originAllowed(origin)) return new Response(JSON.stringify({ error: "Origen no permitido." }), { status: 403, headers });
  if (request.method !== "POST") return new Response(JSON.stringify({ error: "Usa POST." }), { status: 405, headers });

  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    const normalized = messages.filter((m: any) => ["user", "assistant"].includes(m?.role) && typeof m?.content === "string")
      .map((m: any) => ({ role: m.role, content: m.content.slice(0, 3000) }));
    if (!normalized.length || normalized[normalized.length - 1].role !== "user") {
      return new Response(JSON.stringify({ error: "Escribe una pregunta." }), { status: 400, headers });
    }
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const salt = Deno.env.get("CHAT_RATE_SALT");
    const url = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || (() => {
      try { return JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}").default; } catch { return ""; }
    })();
    const openAiKey = Deno.env.get("OPENAI_API_KEY");
    if (!salt || !url || !serviceKey || !openAiKey) throw new Error("Faltan secretos de configuración en Supabase.");

    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${ip}`));
    const ipHash = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { data: permitted, error: limitError } = await admin.rpc("take_jheyvx_chat_slot", { p_ip_hash: ipHash });
    if (limitError) throw limitError;
    if (!permitted) return new Response(JSON.stringify({ error: "Llegaste al límite de preguntas por ahora. Inténtalo en un minuto." }), { status: 429, headers });

    const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${openAiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: Deno.env.get("OPENAI_MODEL") || "gpt-6-luna",
        instructions: "Eres Jheyvx, un asistente útil integrado en el portafolio académico de Jheyssun Vargas. Responde en español salvo que te pidan otro idioma. Sé claro, explica los pasos y muestra unidades cuando correspondan. Para preguntas factuales, actuales, académicas o técnicas usa la búsqueda web; prefiere fuentes oficiales, universidades y documentación primaria. Distingue los hechos de la incertidumbre, nunca inventes cifras ni referencias. Incluye citas vinculadas a las fuentes consultadas. No afirmes ser ChatGPT ni el dueño del portafolio.",
        tools: [{ type: "web_search" }],
        input: normalized,
        max_output_tokens: 750
      })
    });
    const result = await openAiResponse.json();
    if (!openAiResponse.ok) return new Response(JSON.stringify({ error: "El servicio de IA no respondió. Revisa la configuración y el saldo de la API." }), { status: 502, headers });
    const chunks = (result.output || []).filter((item: any) => item.type === "message").flatMap((item: any) => item.content || []);
    const answer = chunks.filter((item: any) => item.type === "output_text").map((item: any) => item.text).join("\n\n") || result.output_text || "No recibí una respuesta de texto.";
    const sources = chunks.flatMap((item: any) => (item.annotations || []).filter((a: any) => a.type === "url_citation")
      .map((a: any) => ({ title: a.title || a.url, url: a.url })));
    const uniqueSources = [...new Map(sources.filter((s: any) => /^https:\/\//.test(s.url)).map((s: any) => [s.url, s])).values()].slice(0, 8);
    return new Response(JSON.stringify({ answer, sources: uniqueSources }), { status: 200, headers });
  } catch (error) {
    console.error("jheyvx-chat error", error);
    return new Response(JSON.stringify({ error: "No se pudo responder ahora. Inténtalo de nuevo más tarde." }), { status: 500, headers });
  }
});
