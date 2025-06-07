const totalPerSecond = 1166; // total CO₂ per second in tons

// Estimasi proporsi berdasarkan data internasional
const sectors = {
  electricity: 0.34,
  transport: 0.15,
  industry: 0.24,
  buildings: 0.06,
  cigarettes: 0.002,
  garbages: 0.03,
};

let total = 0;
let electricity = 0;
let transport = 0;
let industry = 0;
let buildings = 0;
let cigarettes = 0;
let garbages = 0;

function formatNumber(num) {
  return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

setInterval(() => {
  total += totalPerSecond;

  electricity += totalPerSecond * sectors.electricity;
  transport += totalPerSecond * sectors.transport;
  industry += totalPerSecond * sectors.industry;
  buildings += totalPerSecond * sectors.buildings;
  cigarettes += totalPerSecond * sectors.cigarettes;
  garbages += totalPerSecond * sectors.garbages;

  document.getElementById("totalCounter").textContent = formatNumber(total);
  document.getElementById("electricityCounter").textContent = formatNumber(electricity);
  document.getElementById("transportCounter").textContent = formatNumber(transport);
  document.getElementById("industryCounter").textContent = formatNumber(industry);
  document.getElementById("buildingsCounter").textContent = formatNumber(buildings);
  document.getElementById("cigarettesCounter").textContent = formatNumber(cigarettes);
  document.getElementById("garbagesCounter").textContent = formatNumber(garbages);
}, 1000);
