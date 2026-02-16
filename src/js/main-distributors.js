import { loadPartials } from "./utils/loadPartials.js";
import DataService from "./services/dataService.js";
import Filters from "./components/Filters.js";
import DistributorTable from "./components/DistributorTable.js";

console.log("Distributor page loaded");

await loadPartials();

const app = document.querySelector("#app");
const dataService = new DataService();
const { raw } = await dataService.getDashboardData();

// Create dedicated container
const tableContainer = document.createElement("div");
tableContainer.id = "table-container";

// extract distributors and countries
const distributors = [...new Set(raw.map(d => d.distributor))];
const countries = [...new Set(raw.map(d => d.country))];

// Append filters FIRST
app.appendChild(
  Filters((selected) => {
    let filtered = raw;

    if (selected.distributor !== "all") {
      filtered = filtered.filter(
        d => d.distributor === selected.distributor
      );
    }

    if (selected.country !== "all") {
      filtered = filtered.filter(
        d => d.country === selected.country
      );
    }

    renderTable(filtered);
  },
  [
    { key: "distributor", label: "Distributors", options: distributors },
    { key: "country", label: "Countries", options: countries }
  ])
);

// Append container AFTER filters
app.appendChild(tableContainer);

// Render always targets container
function renderTable(data) {
  tableContainer.innerHTML = "";
  tableContainer.appendChild(DistributorTable(data));
}