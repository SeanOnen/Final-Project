export default function Filters(onChange, filterConfig = []) {
  const container = document.createElement("div");
  container.classList.add("filters");

  const state = {};

  // Load saved filters (if any)
  const savedState =
    JSON.parse(localStorage.getItem("dashboardFilters")) || {};

  filterConfig.forEach(config => {
    const select = document.createElement("select");

    // Accessibility
    select.setAttribute("aria-label", config.label);

    select.innerHTML = `
      <option value="all">All ${config.label}</option>
      ${config.options
        .map(o => `<option value="${o}">${o}</option>`)
        .join("")}
    `;

    // Restore saved value or default to "all"
    const savedValue = savedState[config.key] || "all";
    state[config.key] = savedValue;
    select.value = savedValue;

    select.addEventListener("change", () => {
      state[config.key] = select.value;

      // Save entire filter state
      localStorage.setItem(
        "dashboardFilters",
        JSON.stringify(state)
      );

      onChange({ ...state });
    });

    container.appendChild(select);
  });

  // Trigger initial render using restored state
  onChange({ ...state });

  return container;
}