export default function KPICard(title, value, trend = "neutral") {
  const card = document.createElement("div");
  card.classList.add("kpi-card");

  if (trend === "up") card.classList.add("trend-up");
  if (trend === "down") card.classList.add("trend-down");

  const arrow =
    trend === "up" ? "▲" : trend === "down" ? "▼" : "";

  card.innerHTML = `
    <h3>${title}</h3>
    <p>${value.toLocaleString()} <span class="trend-arrow">${arrow}</span></p>
  `;

  return card;
}