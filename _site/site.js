(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("yuque-mirror-theme");
  if (saved) root.dataset.theme = saved;
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("yuque-mirror-theme", next);
  });
  document.getElementById("nav-toggle")?.addEventListener("click", () => document.getElementById("sidebar")?.classList.toggle("open"));

  const docs = window.YUQUE_SEARCH_INDEX || [];
  const renderResults = (input, target, fromRoot) => {
    if (!input || !target) return;
    input.addEventListener("input", () => {
      const q = input.value.trim().toLocaleLowerCase();
      if (!q) { target.innerHTML = ""; return; }
      const base = fromRoot ? "" : document.querySelector('link[href*="site.css"]')?.href.replace(/_site\/site\.css.*$/, "") || "";
      target.innerHTML = docs.filter(d => (d.title + " " + d.book + " " + d.text).toLocaleLowerCase().includes(q)).slice(0, 40)
        .map(d => `<a href="${base}${d.path.split('/').map(encodeURIComponent).join('/')}"><strong>${escapeHtml(d.title)}</strong><span>${escapeHtml(d.book)}</span></a>`).join("") || `<p>未找到结果</p>`;
    });
  };
  const escapeHtml = value => value.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  renderResults(document.getElementById("home-search"), document.getElementById("home-results"), true);
  renderResults(document.getElementById("nav-search"), document.getElementById("search-results"), false);
})();

