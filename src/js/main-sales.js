import { loadPartials } from "./utils/loadPartials.js";
import DataService from "./services/dataService.js";
import Filters from "./components/Filters.js";
import DataTable from "./components/DataTable.js";

await loadPartials();

const app = document.querySelector("#app");
const dataService = new DataService();
const { raw } = await dataService.getDashboardData();

// extract unique brands and countries
const brands = [...new Set(raw.map(d => d.brand))];
const countries = [...new Set(raw.map(d => d.country))];

// render filters
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
    const aggregatedFiltered = dataService.aggregateByBrand(filtered);

    renderTable(aggregatedFiltered);

  },
  [
    { key: "brand", label: "Brands", options: brands },
    { key: "country", label: "Countries", options: countries }
  ])
);

function renderTable(data) {
  document.querySelector("table")?.remove();

  const table = DataTable(
    [
      { label: "Brand", key: "brand" },
      { label: "Total Sales", key: "sales" }
    ],
    data
  );

  app.appendChild(table);
}

// initial render
renderTable(dataService.aggregateByBrand(raw));
