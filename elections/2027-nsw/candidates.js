const SHEET_CSV_URL = "https://opensheet.elk.sh/1EgquRlG2ILDsEk-L9ChZhzw9Un3Nc15ngEuOd7P9qWw/Sheet1";

fetch(SHEET_CSV_URL)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.trim().split("\n").map(row => row.split(","));
    const headers = rows.shift();

    const candidates = rows.map(row => {
      const item = {};
      headers.forEach((header, index) => {
        item[header.trim()] = row[index]?.trim();
      });
      return item;
    });

    renderCandidates(candidates);
  });

function badge(value) {
  const safe = (value || "No Response").toLowerCase().replaceAll(" ", "-");
  return `<span class="stance ${safe}">${value || "No Response"}</span>`;
}

function renderCandidates(candidates) {
  const tableBody = document.getElementById("candidate-table-body");

  candidates.forEach(candidate => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><strong>${candidate.Candidate}</strong></td>
      <td>${candidate.Electorate}</td>
      <td>${candidate.Party}</td>
      <td>${candidate.Priority}</td>
      <td>${badge(candidate.MetroLightRail)}</td>
      <td>${badge(candidate.HighSpeedRail)}</td>
      <td>${badge(candidate.RegionalRailElectrification)}</td>
      <td>${badge(candidate.TOD)}</td>
      <td>${badge(candidate.CongestionPricing)}</td>
      <td>${badge(candidate.ProtectedCycleways)}</td>
      <td>${badge(candidate.FareFreePublicTransport)}</td>
    `;

    tableBody.appendChild(row);
  });
}
