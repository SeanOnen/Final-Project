import { loadPartials } from "./utils/loadPartials.js";
import DataService from "./services/dataService.js";
import KPICard from "./components/KPICard.js";

await loadPartials();

const app = document.querySelector("#app");
const dataService = new DataService();

const { aggregated } = await dataService.getDashboardData();

const kpiContainer = document.createElement("div");
kpiContainer.classList.add("kpi-container");

kpiContainer.append(
  KPICard("Total Sales", aggregated.reduce((s, b) => s + b.sales, 0)),
  KPICard("Stock Levels", aggregated.reduce((s, b) => s + b.stock, 0)),
  KPICard("Empties Returned", aggregated.reduce((s, b) => s + b.empties, 0))
);

const intro = document.createElement("section");
intro.classList.add("dashboard-section");
intro.innerHTML = `
  <h2>Executive Summary</h2>
  <p>
    This overview consolidates distributor-reported sales, stock,
    empties and in-transit data across all brands.
  </p>
`;

app.append(intro, kpiContainer);