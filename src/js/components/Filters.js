export default function Filters(onChange, options = []) {
  const container = document.createElement("div");
  container.classList.add("filters");

  const select = document.createElement("select");

  select.innerHTML = `
    <option value="all">All</option>
    ${options.map(o => `<option value="${o}">${o}</option>`).join("")}
  `;

  select.addEventListener("change", () => {
    onChange(select.value);
  });

  container.appendChild(select);
  return container;
}