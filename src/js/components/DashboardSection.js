export default function DashboardSection(title) {
  const section = document.createElement("section");
  section.classList.add("dashboard-section");

  const heading = document.createElement("h2");
  heading.textContent = title;

  const list = document.createElement("ul");

  section.append(heading, list);

  function render(data, metric) {
    list.innerHTML = "";

    if (!data.length) {
      list.innerHTML = "<li>No data available</li>";
      return;
    }

    data.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("dashboard-row");

      if (metric === "stock") {
        if (item.stock === 0) li.classList.add("out-of-stock");
        else if (item.stock < 50) li.classList.add("low-stock");
      }

      li.innerHTML = `
        <span>${item.distributor} – ${item.brand}</span>
        <strong>${item[metric]}</strong>
      `;

      list.appendChild(li);
    });
  }

  return {
    el: section,
    render
  };
}