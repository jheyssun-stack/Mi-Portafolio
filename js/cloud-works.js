import { supabase, cloudReady } from "./supabase-client.js";

function fileCard(item) {
  const card = document.createElement("article");
  card.className = "cloud-file-card";
  const name = document.createElement("h3");
  name.textContent = item.title;
  const note = document.createElement("p");
  note.textContent = item.description || item.original_name;
  const link = document.createElement("a");
  link.href = item.public_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = item.content_type?.startsWith("image/") ? "Ver imagen ↗" : "Abrir archivo ↗";
  card.append(name, note, link);
  if (item.content_type?.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = item.public_url;
    img.alt = item.title;
    img.loading = "lazy";
    card.prepend(img);
  }
  return card;
}

async function loadInto(container) {
  if (!cloudReady) {
    const p = document.createElement("p");
    p.textContent = "El almacenamiento en la nube se activa al configurar Supabase.";
    container.replaceChildren(p);
    return;
  }
  const { course, section } = container.dataset;
  const { data, error } = await supabase.from("portfolio_items")
    .select("id,title,description,original_name,content_type,public_url,created_at")
    .eq("course", course).eq("section", section).order("created_at", { ascending: false });
  container.replaceChildren();
  if (error) {
    const p = document.createElement("p");
    p.textContent = "No se pudieron cargar los archivos de la nube.";
    container.append(p);
    return;
  }
  if (!data?.length) {
    const p = document.createElement("p");
    p.textContent = "Aún no hay archivos subidos en esta sección.";
    container.append(p);
    return;
  }
  data.forEach(item => container.append(fileCard(item)));
}

window.loadPortfolioCloudItems = loadInto;
document.querySelectorAll(".cloud-items[data-course][data-section]").forEach(loadInto);

// Las semanas conservan sus trabajos actuales de GitHub y suman aquí los archivos de la base de datos.
document.querySelectorAll("details.week[data-cloud-course][data-cloud-section]").forEach(section => {
  const inside = section.querySelector(".inside");
  if (!inside) return;
  const observer = new MutationObserver(() => {
    let container = inside.querySelector(":scope > .cloud-items");
    if (container) return;
    container = document.createElement("div");
    container.className = "cloud-items cloud-week-items";
    container.dataset.course = section.dataset.cloudCourse;
    container.dataset.section = section.dataset.cloudSection;
    const heading = document.createElement("h3");
    heading.textContent = "Archivos subidos desde el panel";
    container.append(heading);
    inside.append(container);
    loadInto(container);
  });
  observer.observe(inside, { childList: true });
  const container = document.createElement("div");
  container.className = "cloud-items cloud-week-items";
  container.dataset.course = section.dataset.cloudCourse;
  container.dataset.section = section.dataset.cloudSection;
  const heading = document.createElement("h3"); heading.textContent = "Archivos subidos desde el panel";
  container.append(heading); inside.append(container); loadInto(container);
});
