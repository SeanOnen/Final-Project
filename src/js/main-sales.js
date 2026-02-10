import { loadPartials } from "./utils/loadPartials.js";
import DataService from "./services/dataService.js";
import Filters from "./components/Filters.js";
import DataTable from "./components/DataTable.js";

await loadPartials();

const app = document.querySelector("#app");
const dataService = new DataService();
const { aggregated } = await dataService.getDashboardData();

const brands = aggregated.map(b => b.brand);

app.appendChild(
  Filters((brand) => {
    renderTable(brand === "all" ? aggregated : aggregated.filter(b => b.brand === brand));
  }, brands)
);

function renderTable(data) {
  const table = DataTable(
    [
      { label: "Brand", key: "brand" },
      { label: "Total Sales", key: "sales" }
    ],
    data
  );

  const existing = document.querySelector("table");
  if (existing) existing.remove();
  app.appendChild(table);
}

renderTable(aggregated);
