import { loadPartials } from "./utils/loadPartials.js";
import DataService from "./services/dataService.js";
import KPICard from "./components/KPICard.js";
import Chart from "chart.js/auto";

console.log("FMCG Dashboard loaded");

await loadPartials();

const dataService = new DataService();
const dashboardData = await dataService.getDashboardData();
const aggregated = dashboardData.aggregated;

/* =============================
   EXECUTIVE TOTALS (HTML TILES)
============================= */
const totalSales = aggregated.reduce((s, b) => s + b.sales, 0);
const totalStock = aggregated.reduce((s, b) => s + b.stock, 0);
const totalEmpties = aggregated.reduce((s, b) => s + b.empties, 0);

document.getElementById("total-sales").textContent =
  totalSales.toLocaleString();
document.getElementById("total-stock").textContent =
  totalStock.toLocaleString();
document.getElementById("total-empties").textContent =
  totalEmpties.toLocaleString();

/* =============================
   EXECUTIVE STATUS LOGIC
============================= */
const salesTarget = 50000;
const stockTarget = 30000;
const emptiesMax = 10000;

const salesStatus = document.getElementById("sales-status");
const stockStatus = document.getElementById("stock-status");
const emptiesStatus = document.getElementById("empties-status");

salesStatus.textContent =
  totalSales >= salesTarget ? "On Track" : "Below Target";
salesStatus.className =
  totalSales >= salesTarget ? "status good" : "status warn";

stockStatus.textContent =
  totalStock >= stockTarget ? "Healthy" : "Low";
stockStatus.className =
  totalStock >= stockTarget ? "status good" : "status warn";

emptiesStatus.textContent =
  totalEmpties <= emptiesMax ? "Within Limit" : "Excess";
emptiesStatus.className =
  totalEmpties <= emptiesMax ? "status good" : "status bad";

/* =============================
   KPI TREND LOGIC
============================= */

const salesTrend =
  totalSales >= salesTarget ? "up" : "down";

const stockTrend =
  totalStock >= stockTarget ? "up" : "down";

const emptiesTrend =
  totalEmpties <= emptiesMax ? "up" : "down";

/* =============================
   KPI CARDS (JS COMPONENTS)
============================= */
const kpiContainer = document.getElementById("kpi-cards");

kpiContainer.append(
  KPICard("Total Sales", totalSales, salesTrend),
  KPICard("Total Stock", totalStock, stockTrend),
  KPICard("Empties Outstanding", totalEmpties, emptiesTrend)
);

/* =============================
   PERFORMANCE CHART
============================= */
const ctx = document.getElementById("performanceChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: aggregated.map(b => b.brand),
    datasets: [
      {
        label: "Sales",
        data: aggregated.map(b => b.sales),
        backgroundColor: "#040273"
      },
      {
        label: "Stock",
        data: aggregated.map(b => b.stock),
        backgroundColor: "#FFBF00"
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { title: { display: true, text: "Units" } },
      x: { title: { display: true, text: "Brand" } }
    }
  }
});