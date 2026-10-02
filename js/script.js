const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");

menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => nav?.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));


// Visor de infografías
const infoModal = document.getElementById("infografiaModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".infografia-open, .infografia-card > img").forEach(el => {
    el.addEventListener("click", () => {
        const img = el.matches("img") ? el : document.querySelector(`img[src="${el.dataset.img}"]`);
        const src = el.dataset.img || img?.getAttribute("src");
        if (!src || !infoModal) return;
        modalImage.src = src;
        modalTitle.textContent = el.dataset.title || img?.alt || "Infografía";
        infoModal.classList.add("open");
        infoModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

function closeInfoModal(){
    if (!infoModal) return;
    infoModal.classList.remove("open");
    infoModal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    document.body.style.overflow = "";
}
modalClose?.addEventListener("click", closeInfoModal);
infoModal?.addEventListener("click", e => { if (e.target === infoModal) closeInfoModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeInfoModal(); });
