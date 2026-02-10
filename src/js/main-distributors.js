import { loadPartials } from "./utils/loadPartials.js";
import DataService from "./services/dataService.js";
import Filters from "./components/Filters.js";
import DistributorTable from "./components/DistributorTable.js";

console.log("Distributor page loaded");

await loadPartials();

const app = document.querySelector("#app");
const dataService = new DataService();
const { raw } = await dataService.getDashboardData();

// extract distributors
const distributors = [...new Set(raw.map(d => d.distributor))];

// render filter
app.appendChild(
  Filters((selectedDistributor) => {
    const filtered =
      selectedDistributor === "all"
        ? raw
        : raw.filter(d => d.distributor === selectedDistributor);

    renderTable(filtered);
  }, distributors)
);

function renderTable(data) {
  const existing = document.querySelector("table");
  if (existing) existing.remove();

  app.appendChild(DistributorTable(data));
}

// initial render
renderTable(raw);
