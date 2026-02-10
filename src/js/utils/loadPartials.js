export async function loadPartials() {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) {
    const headerHTML = await fetch("/src/public/partials/header.html").then(r => r.text());
    headerEl.innerHTML = headerHTML;
  }

  if (footerEl) {
    const footerHTML = await fetch("/src/public/partials/footer.html").then(r => r.text());
    footerEl.innerHTML = footerHTML;
  }
}