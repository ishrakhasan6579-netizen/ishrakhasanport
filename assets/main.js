(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("ih-theme");
  if (savedTheme) root.dataset.theme = savedTheme;
  const themeButton = document.querySelector(".theme-toggle");
  themeButton?.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    localStorage.setItem("ih-theme", next);
  });
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });
  document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  const progress = document.getElementById("progress");
  window.addEventListener("scroll", () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }, { passive: true });
  const data = window.PORTFOLIO_DATA || {};
  const emailLink = document.getElementById("email-link");
  if (emailLink && data.email) emailLink.href = `mailto:${data.email}`;
  const socialList = document.getElementById("social-list");
  if (socialList && Array.isArray(data.socials)) {
    socialList.innerHTML = data.socials.map(s => `<a class="social-item" href="${safeUrl(s.url)}" target="_blank" rel="noopener noreferrer"><span>${escapeHTML(s.name)}</span><b>↗</b></a>`).join("");
  }
  const posts = data.posts || [];
  const postContainer = document.querySelector(".small-empty");
  if (postContainer && posts.length) {
    postContainer.outerHTML = `<div class="post-grid">${posts.map(p => `<a class="post-card" href="${safeUrl(p.url)}" target="_blank" rel="noopener noreferrer"><span class="eyebrow">${escapeHTML(p.category || "ARTICLE")} · ${escapeHTML(p.date || "")}</span><h3>${escapeHTML(p.title)}</h3><span class="text-link">Read article ↗</span></a>`).join("")}</div>`;
  }
  function safeUrl(value) {
    try { const u = new URL(value); return ["http:", "https:"].includes(u.protocol) ? u.href : "#"; }
    catch { return "#"; }
  }
  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
})();