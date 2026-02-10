export default function DataTable(columns, rows) {
  const table = document.createElement("table");
  table.classList.add("data-table");

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col.label;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);

  const tbody = document.createElement("tbody");

  if (!rows.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = columns.length;
    td.textContent = "No data available";
    tr.appendChild(td);
    tbody.appendChild(tr);
  } else {
    rows.forEach(row => {
      const tr = document.createElement("tr");

      columns.forEach(col => {
        const td = document.createElement("td");
        td.textContent = row[col.key];
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  }

  table.append(thead, tbody);
  return table;
}