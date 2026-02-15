export default function KPICard(title, value, trend = "neutral") {
  const card = document.createElement("div");
  card.classList.add("kpi-card");

  if (trend === "up") card.classList.add("trend-up");
  if (trend === "down") card.classList.add("trend-down");

  // Accessibility: announce dynamic updates
  card.setAttribute("role", "status");
  card.setAttribute("aria-live", "polite");

  const arrow =
    trend === "up" ? "▲" : trend === "down" ? "▼" : "";

  const trendText =
    trend === "up"
      ? "Increasing"
      : trend === "down"
      ? "Decreasing"
      : "No change";

  card.innerHTML = `
    <h3>${title}</h3>
    <p>
      ${value.toLocaleString()}
      <span class="trend-arrow" aria-hidden="true">${arrow}</span>
      <span class="sr-only">Trend: ${trendText}</span>
    </p>
  `;

  return card;
}