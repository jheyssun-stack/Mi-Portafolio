import { supabase, cloudReady } from "./supabase-client.js";

const $ = id => document.getElementById(id);
const loginPanel = $("loginPanel"), uploadPanel = $("uploadPanel");
const form = $("uploadForm"), status = $("status");

for (let week = 1; week <= 16; week++) {
  const option = document.createElement("option");
  option.value = `week-${String(week).padStart(2, "0")}`;
  option.textContent = `Semana ${week}`;
  $("algorithmSection").append(option);
}

if (!cloudReady) {
  $("setupNote").textContent = "Primero configura js/cloud-config.js con la URL y la publishable key del proyecto Supabase.";
  loginPanel.hidden = true;
} else {
  $("setupNote").hidden = true;
  supabase.auth.onAuthStateChange((_event, session) => refresh(session?.user || null));
  supabase.auth.getSession().then(({ data }) => refresh(data.session?.user || null));
}

async function refresh(user) {
  loginPanel.hidden = !!user;
  uploadPanel.hidden = !user;
  if (!user) return;
  const { data: admin, error } = await supabase.from("portfolio_admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (error || !admin) {
    uploadPanel.hidden = true;
    $("setupNote").hidden = false;
    $("setupNote").textContent = "La cuenta inició sesión, pero todavía no tiene permiso de administrador. Añade su user ID a portfolio_admins siguiendo LEEME.txt.";
    await supabase.auth.signOut();
    loginPanel.hidden = false;
    return;
  }
  await loadItems();
}

$("loginForm").addEventListener("submit", async event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const { error } = await supabase.auth.signInWithPassword({ email: data.get("email"), password: data.get("password") });
  $("setupNote").hidden = !error;
  if (error) $("setupNote").textContent = "No se pudo iniciar sesión. Revisa el correo, la contraseña y la configuración de Auth.";
});

$("signOut").addEventListener("click", async () => { await supabase.auth.signOut(); });

$("uploadForm").elements.course.addEventListener("change", () => {
  const isAlgorithms = $("uploadForm").elements.course.value === "algoritmos";
  $("algorithmSection").parentElement.hidden = !isAlgorithms;
  $("appSection").parentElement.hidden = isAlgorithms;
});
$("uploadForm").elements.course.dispatchEvent(new Event("change"));

form.addEventListener("submit", async event => {
  event.preventDefault();
  const data = new FormData(form);
  const file = data.get("file");
  if (!file || !file.size) return;
  if (file.size > 50 * 1024 * 1024) { status.textContent = "El archivo supera el máximo de 50 MB."; return; }
  const course = data.get("course");
  const section = course === "algoritmos" ? data.get("algorithmSection") : data.get("appSection");
  const cleanName = file.name.normalize("NFKD").replace(/[^\w.()-]+/g, "-").slice(-120);
  const path = `${course}/${section}/${crypto.randomUUID()}-${cleanName}`;
  status.textContent = "Subiendo archivo…";
  const { error: uploadError } = await supabase.storage.from("portfolio-files").upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });
  if (uploadError) { status.textContent = `No se pudo subir: ${uploadError.message}`; return; }
  const { data: publicData } = supabase.storage.from("portfolio-files").getPublicUrl(path);
  const { error: rowError } = await supabase.from("portfolio_items").insert({
    course, section,
    title: String(data.get("title")).trim(),
    description: String(data.get("description") || "").trim(),
    file_path: path,
    public_url: publicData.publicUrl,
    original_name: file.name,
    content_type: file.type || "application/octet-stream"
  });
  if (rowError) {
    await supabase.storage.from("portfolio-files").remove([path]);
    status.textContent = `El archivo se subió, pero no se pudo guardar su ficha: ${rowError.message}`;
    return;
  }
  form.reset();
  $("uploadForm").elements.course.dispatchEvent(new Event("change"));
  status.textContent = "Subido y publicado en el portafolio.";
  await loadItems();
});

async function loadItems() {
  const list = $("itemsList");
  list.replaceChildren();
  const { data, error } = await supabase.from("portfolio_items").select("id,title,course,section,file_path,public_url").order("created_at", { ascending: false });
  if (error) { list.textContent = "No se pudo cargar la lista."; return; }
  for (const item of data || []) {
    const row = document.createElement("div"); row.className = "item-row";
    const link = document.createElement("a"); link.href = item.public_url; link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = `${item.title} · ${item.course === "apps" ? item.section.replace("-", " ") : item.section.replace("week-", "Semana ")}`;
    const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "Eliminar";
    remove.addEventListener("click", async () => {
      remove.disabled = true;
      const { error: storageError } = await supabase.storage.from("portfolio-files").remove([item.file_path]);
      const { error: rowError } = await supabase.from("portfolio_items").delete().eq("id", item.id);
      if (storageError || rowError) { status.textContent = "No se pudo eliminar el archivo."; remove.disabled = false; return; }
      await loadItems();
    });
    row.append(link, remove); list.append(row);
  }
}
