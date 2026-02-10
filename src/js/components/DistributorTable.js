export default function DistributorTable(data) {
  const table = document.createElement("table");
  table.classList.add("data-table");

  table.innerHTML = `
    <thead>
      <tr>
        <th>Distributor</th>
        <th>Brand</th>
        <th>Sales</th>
        <th>Stock</th>
        <th>Empties</th>
        <th>In Transit</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  if (!data.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="6">No distributor data available</td>`;
    tbody.appendChild(tr);
    return table;
  }

  data.forEach(item => {
    const tr = document.createElement("tr");

    if (item.stock === 0) tr.classList.add("out-of-stock");
    else if (item.stock < 500) tr.classList.add("low-stock");

    tr.innerHTML = `
      <td>${item.distributor}</td>
      <td>${item.brand}</td>
      <td>${item.sales}</td>
      <td>${item.stock}</td>
      <td>${item.empties}</td>
      <td>${item.inTransit}</td>
    `;

    tbody.appendChild(tr);
  });

  return table;
}