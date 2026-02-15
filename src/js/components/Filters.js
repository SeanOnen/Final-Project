export default function Filters(onChange, filterConfig = []) {
  const container = document.createElement("div");
  container.classList.add("filters");

  const state = {};

  filterConfig.forEach(config => {
    const select = document.createElement("select");

    // Accessibility: give select an accessible name
    select.setAttribute("aria-label", config.label);

    select.innerHTML = `
      <option value="all">All ${config.label}</option>
      ${config.options
        .map(o => `<option value="${o}">${o}</option>`)
        .join("")}
    `;

    state[config.key] = "all";

    select.addEventListener("change", () => {
      state[config.key] = select.value;
      onChange({ ...state });
    });

    container.appendChild(select);
  });

  return container;
}