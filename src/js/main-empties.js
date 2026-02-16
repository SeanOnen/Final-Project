import { loadPartials } from "./utils/loadPartials.js";
import DataService from "./services/dataService.js";
import Filters from "./components/Filters.js";
import DataTable from "./components/DataTable.js";

await loadPartials();

const app = document.querySelector("#app");
const dataService = new DataService();
const { raw } = await dataService.getDashboardData();

// Create dedicated container
const tableContainer = document.createElement("div");
tableContainer.id = "table-container";

// extract unique brands and countries from raw
const brands = [...new Set(raw.map(d => d.brand))];
const countries = [...new Set(raw.map(d => d.country))];

// Append filters FIRST
app.appendChild(
  Filters((selected) => {

    let filtered = raw;

    if (selected.brand !== "all") {
      filtered = filtered.filter(
        d => d.brand === selected.brand
      );
    }

    if (selected.country !== "all") {
      filtered = filtered.filter(
        d => d.country === selected.country
      );
    }

    // re-aggregate AFTER filtering
    const aggregatedFiltered =
      dataService.aggregateByBrand(filtered);

    renderTable(aggregatedFiltered);

  },
  [
    { key: "brand", label: "Brands", options: brands },
    { key: "country", label: "Countries", options: countries }
  ])
);

// Append container AFTER filters
app.appendChild(tableContainer);

// Render always targets container
function renderTable(data) {

  tableContainer.innerHTML = "";

  const table = DataTable(
    [
      { label: "Brand", key: "brand" },
      { label: "Empties Returned", key: "empties" }
    ],
    data
  );

  tableContainer.appendChild(table);
}