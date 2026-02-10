export async function loadPartials() {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) {
    const res = await fetch("/partials/header.html");
    headerEl.innerHTML = await res.text();
  }

  if (footerEl) {
    const res = await fetch("/partials/footer.html");
    footerEl.innerHTML = await res.text();
  }
}
