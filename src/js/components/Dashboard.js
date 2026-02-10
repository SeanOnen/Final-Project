import KPICard from "./KPICard.js";

export default function Dashboard(data) {
  const fragment = document.createDocumentFragment();

  /* =============================
     KPI SUMMARY
  ============================== */
  const kpiContainer = document.createElement("div");
  kpiContainer.classList.add("kpi-container");

  const totalSales = data.aggregated.reduce((s, b) => s + b.sales, 0);
  const totalStock = data.aggregated.reduce((s, b) => s + b.stock, 0);
  const totalEmpties = data.aggregated.reduce((s, b) => s + b.empties, 0);

  kpiContainer.appendChild(KPICard("Total Sales", totalSales, "up"));
  kpiContainer.appendChild(KPICard("Stock Levels", totalStock, "neutral"));
  kpiContainer.appendChild(KPICard("Empties Returned", totalEmpties, "down"));

  fragment.appendChild(kpiContainer);

  /* =============================
     PERFORMANCE OVERVIEW
  ============================== */
  const perf = document.createElement("section");
  perf.classList.add("dashboard-section");
  perf.innerHTML = `
    <h2>Performance Overview</h2>
    <canvas id="salesStockChart" height="140"></canvas>
  `;
  fragment.appendChild(perf);

  /* =============================
     TARGET VS ACTUAL
  ============================== */
  const targets = document.createElement("section");
  targets.classList.add("dashboard-section");
  targets.innerHTML = `
    <h2>Targets vs Actual</h2>
    <canvas id="targetChart" height="140"></canvas>
  `;
  fragment.appendChild(targets);

  // Draw charts AFTER DOM renders
  setTimeout(() => {
    drawSalesStockChart(data.raw);
    drawTargetChart(data.aggregated);
  }, 0);

  return fragment;
}

function drawSalesStockChart(data) {
  const canvas = document.getElementById("salesStockChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const padding = 50;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.stock)));
  const barGroupWidth = chartWidth / data.length;
  const barWidth = barGroupWidth / 3;

  /* Axes */
  ctx.strokeStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  /* Y-axis label */
  ctx.save();
  ctx.translate(15, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = "12px Roboto";
  ctx.fillText("Units", 0, 0);
  ctx.restore();

  data.forEach((item, i) => {
    const x = padding + i * barGroupWidth + barWidth;

    const salesHeight = (item.sales / maxValue) * chartHeight;
    const stockHeight = (item.stock / maxValue) * chartHeight;

    // Sales bar
    ctx.fillStyle = "#040273";
    ctx.fillRect(
      x,
      height - padding - salesHeight,
      barWidth,
      salesHeight
    );

    // Stock bar
    ctx.fillStyle = "#FFBF00";
    ctx.fillRect(
      x + barWidth + 4,
      height - padding - stockHeight,
      barWidth,
      stockHeight
    );

    // Brand label
    ctx.fillStyle = "#000";
    ctx.font = "10px Roboto";
    ctx.textAlign = "center";
    ctx.fillText(
      item.brand,
      x + barWidth,
      height - padding + 14
    );
  });

  /* Legend */
  ctx.fillStyle = "#040273";
  ctx.fillRect(width - 140, 20, 12, 12);
  ctx.fillStyle = "#000";
  ctx.fillText("Sales", width - 120, 30);

  ctx.fillStyle = "#FFBF00";
  ctx.fillRect(width - 140, 40, 12, 12);
  ctx.fillStyle = "#000";
  ctx.fillText("Stock", width - 120, 50);
}

function drawTargetChart(data) {
  const canvas = document.getElementById("targetChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const padding = 50;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  const target = 10000;
  const maxValue = Math.max(
    target,
    ...data.map(d => d.sales)
  );

  const barWidth = chartWidth / data.length;

  /* Axes */
  ctx.strokeStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  /* Target line */
  const targetY =
    height - padding - (target / maxValue) * chartHeight;

  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "#dc3545";
  ctx.beginPath();
  ctx.moveTo(padding, targetY);
  ctx.lineTo(width - padding, targetY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#dc3545";
  ctx.font = "12px Roboto";
  ctx.fillText("Target", padding + 5, targetY - 5);

  /* Bars */
  data.forEach((item, i) => {
    const barHeight = (item.sales / maxValue) * chartHeight;
    const x = padding + i * barWidth + 10;

    ctx.fillStyle = "#040273";
    ctx.fillRect(
      x,
      height - padding - barHeight,
      barWidth - 20,
      barHeight
    );

    ctx.fillStyle = "#000";
    ctx.font = "10px Roboto";
    ctx.textAlign = "center";
    ctx.fillText(
      item.brand,
      x + (barWidth - 20) / 2,
      height - padding + 14
    );
  });

  /* Y-axis label */
  ctx.save();
  ctx.translate(15, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.font = "12px Roboto";
  ctx.fillText("Sales Units", 0, 0);
  ctx.restore();
}