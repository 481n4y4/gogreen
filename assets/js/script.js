const EMISSION_PER_SECOND = 1166; // ton CO₂/detik
// const SECONDS_PER_DAY = 86400; //tidak digunakan, tapi disiapkan

const sectors = {
  electricity: 0.34,
  transport: 0.15,
  industry: 0.24,
  buildings: 0.06,
  cigarettes: 0.002,
  garbages: 0.03
};

// Hitung emisi CO₂ sejak pukul 00:00 hari ini
function getTodayEmission() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const secondsElapsed = Math.floor((now - startOfDay) / 1000);
  return secondsElapsed * EMISSION_PER_SECOND;
}

let totalToday = getTodayEmission();

function formatNumber(num) {
  return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function updateCounters() {
  totalToday += EMISSION_PER_SECOND;

  document.getElementById("totalCounter").textContent = formatNumber(totalToday);
  document.getElementById("electricityCounter").textContent = formatNumber(totalToday * sectors.electricity);
  document.getElementById("transportCounter").textContent = formatNumber(totalToday * sectors.transport);
  document.getElementById("industryCounter").textContent = formatNumber(totalToday * sectors.industry);
  document.getElementById("buildingsCounter").textContent = formatNumber(totalToday * sectors.buildings);
  document.getElementById("cigarettesCounter").textContent = formatNumber(totalToday * sectors.cigarettes);
  document.getElementById("garbagesCounter").textContent = formatNumber(totalToday * sectors.garbages);
}

updateCounters(); // tampilkan angka saat pertama kali dibuka
setInterval(updateCounters, 1000); // update tiap detik
