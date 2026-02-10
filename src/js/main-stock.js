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
  const enhanced = data.map(item => ({
    ...item,
    stock: item.stock === 0 ? "⛔ 0" : item.stock < 500 ? `⚠ ${item.stock}` : item.stock
  }));

  const table = DataTable(
    [
      { label: "Brand", key: "brand" },
      { label: "Stock Level", key: "stock" }
    ],
    enhanced
  );

  document.querySelector("table")?.remove();
  app.appendChild(table);
}

renderTable(aggregated);
