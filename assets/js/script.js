// Konstanta
const emisiPerDetik = 9.08; // ton CO2e per detik (pertambahan)
const totalAwal2023 = 53.82 * 1e9; // total emisi di 1 Jan 2023 (ton CO2e)
const waktuAwal2023 = new Date("2023-01-01T00:00:00Z").getTime(); // waktu awal hitung (UTC)

// Elemen DOM
const totalCounter = document.getElementById("totalCounter");
const co2Counter = document.getElementById("co2Counter");
const ch4Counter = document.getElementById("ch4Counter");
const n20Counter = document.getElementById("n20Counter");
const fgasCounter = document.getElementById("fgasCounter");
const energiCounter = document.getElementById("energiCounter");
const transportasiCounter = document.getElementById("transportasiCounter");
const industriCounter = document.getElementById("industriCounter");
const bangunanCounter = document.getElementById("bangunanCounter");
const lahanCounter = document.getElementById("lahanCounter");
const pembakaranCounter = document.getElementById("pembakaranCounter");
const sampahCounter = document.getElementById("sampahCounter");
const limbahCounter = document.getElementById("limbahCounter");

// Proporsi emisi gas
const gasProporsi = {
  co2: 0.75,
  ch4: 0.175,
  n20: 0.05,
  fgas: 0.025,
};

// Proporsi sektor emisi
const sektorProporsi = {
  energi: 0.732,
  transportasi: 0.162,
  industri: 0.052,
  bangunan: 0.175,
  lahan: 0.184,
  pembakaran: 0.078,
  sampah: 0.032,
  limbah: 0.032,
};

// Fungsi update data emisi
function updateEmisi() {
  const now = Date.now();
  const detikDariAwal = (now - waktuAwal2023) / 1000;

  // Hitung total emisi sampai sekarang
  const totalEmisiSekarang = totalAwal2023 + detikDariAwal * emisiPerDetik;

  // Update total counter
  totalCounter.textContent = totalEmisiSekarang.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });

  // Hitung per gas
  co2Counter.textContent = (
    totalEmisiSekarang * gasProporsi.co2
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  ch4Counter.textContent = (
    totalEmisiSekarang * gasProporsi.ch4
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  n20Counter.textContent = (
    totalEmisiSekarang * gasProporsi.n20
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  fgasCounter.textContent = (
    totalEmisiSekarang * gasProporsi.fgas
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });

  // Hitung per sektor
  energiCounter.textContent = (
    totalEmisiSekarang * sektorProporsi.energi
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  transportasiCounter.textContent = (
    totalEmisiSekarang * sektorProporsi.transportasi
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  industriCounter.textContent = (
    totalEmisiSekarang * sektorProporsi.industri
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  bangunanCounter.textContent = (
    totalEmisiSekarang * sektorProporsi.bangunan
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  lahanCounter.textContent = (
    totalEmisiSekarang * sektorProporsi.lahan
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  pembakaranCounter.textContent = (
    totalEmisiSekarang * sektorProporsi.pembakaran
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  sampahCounter.textContent = (
    totalEmisiSekarang * sektorProporsi.sampah
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
  limbahCounter.textContent = (
    totalEmisiSekarang * sektorProporsi.limbah
  ).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

// Update setiap detik
setInterval(updateEmisi, 1000);
updateEmisi();
