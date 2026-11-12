import { supabase, cloudReady } from "./supabase-client.js";

const launcher = document.createElement("button");
launcher.className = "jheyvx-launch";
launcher.type = "button";
launcher.setAttribute("aria-label", "Abrir asistente Jheyvx");
launcher.innerHTML = '<img src="assets/jheyvx-avatar.svg" alt="">';
const panel = document.createElement("section");
panel.className = "jheyvx-window";
panel.setAttribute("aria-label", "Asistente Jheyvx");
panel.innerHTML = '<header class="jheyvx-head"><img src="assets/jheyvx-avatar.svg" alt=""><div><b>Jheyvx</b><small>Asistente académico con búsqueda web</small></div><button class="jheyvx-close" type="button" aria-label="Cerrar">×</button></header><div class="jheyvx-messages" aria-live="polite"></div><form class="jheyvx-compose"><textarea maxlength="3000" rows="1" placeholder="Pregúntame algo…" aria-label="Escribe una pregunta" required></textarea><button type="submit">Enviar</button></form><p class="jheyvx-disclaimer">Las respuestas pueden equivocarse. Revisa las fuentes antes de usar información importante. El uso de IA puede tener costo.</p>';
const avatarUrl = new URL("../assets/jheyvx-avatar.svg", import.meta.url).href;
launcher.querySelector("img").src = avatarUrl;
panel.querySelectorAll(".jheyvx-head img").forEach(img => { img.src = avatarUrl; });
document.body.append(launcher, panel);
const messagesEl = panel.querySelector(".jheyvx-messages");
const input = panel.querySelector("textarea");
const history = [];

function addMessage(role, text, sources = []) {
  const bubble = document.createElement("div"); bubble.className = `jheyvx-msg ${role}`; bubble.textContent = text;
  if (sources.length) {
    const refs = document.createElement("div"); refs.className = "jheyvx-sources";
    const label = document.createElement("b"); label.textContent = "Fuentes"; refs.append(label);
    sources.forEach(source => { const a = document.createElement("a"); a.href = source.url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = source.title || source.url; refs.append(a); });
    bubble.append(refs);
  }
  messagesEl.append(bubble); messagesEl.scrollTop = messagesEl.scrollHeight; return bubble;
}

addMessage("bot", "¡Hola! Soy Jheyvx. Puedo ayudarte con preguntas, explicar temas paso a paso y buscar fuentes en la web.");
launcher.addEventListener("click", () => { panel.classList.toggle("open"); if (panel.classList.contains("open")) input.focus(); });
panel.querySelector(".jheyvx-close").addEventListener("click", () => panel.classList.remove("open"));
panel.querySelector("form").addEventListener("submit", async event => {
  event.preventDefault();
  const text = input.value.trim(); if (!text) return;
  addMessage("user", text); history.push({ role: "user", content: text }); input.value = "";
  if (!cloudReady) { addMessage("bot", "El asistente estará disponible cuando se configure Supabase y su función segura de IA.", []); return; }
  const typing = addMessage("bot", "Buscando y preparando una respuesta…"); typing.classList.add("jheyvx-typing");
  try {
    const { data, error } = await supabase.functions.invoke("jheyvx-chat", { body: { messages: history } });
    typing.remove();
    if (error || data?.error) { addMessage("bot", data?.error || "No pude conectar con el asistente. Intenta otra vez."); return; }
    history.push({ role: "assistant", content: data.answer });
    addMessage("bot", data.answer, data.sources || []);
  } catch {
    typing.remove();
    addMessage("bot", "No pude conectar con el asistente. Intenta otra vez.");
  }
});
