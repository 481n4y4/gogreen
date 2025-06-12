// DOM Elements
const navButtons = {
  transportation: document.getElementById("nav-transportation"),
  homeEnergy: document.getElementById("nav-homeEnergy"),
  food: document.getElementById("nav-food"),
  results: document.getElementById("nav-results"),
};
const pages = {
  home: document.getElementById("page-home"),
  transportation: document.getElementById("page-transportation"),
  homeEnergy: document.getElementById("page-homeEnergy"),
  food: document.getElementById("page-food"),
  results: document.getElementById("page-results"),
};
const restartButton = document.getElementById("restartButton");
const totalEmissionsResult = document.getElementById("totalEmissionsResult");

// State untuk menyimpan data input emisi
let emissionData = {
  transportation: {
    carDistance: "",
    carFuelType: "gasoline",
    motorcycleDistance: "",
    motorcycleFuelType: "gasoline",
    busDistance: "",
    trainDistance: "",
  },
  homeEnergy: {
    electricityKwh: "",
    gasKg: "",
  },
  food: {
    redMeatKg: "",
    chickenKg: "",
    riceKg: "",
    vegetablesKg: "",
  },
};

// Faktor emisi (kg CO2e per unit) - Angka-angka ini adalah estimasi berdasarkan data yang tersedia.
// Untuk akurasi tertinggi, disarankan merujuk pada laporan resmi dari instansi pemerintah terkait (misalnya KLHK)
// atau penelitian ilmiah terkini yang lebih terlokalisasi di Indonesia.
const emissionFactors = {
  // Transportasi
  // Asumsi konsumsi bahan bakar: mobil bensin ~10 km/liter, mobil diesel ~12 km/liter.
  // Motor bensin ~30 km/liter, motor diesel ~35 km/liter.
  carGasoline: 2.3, // kg CO2e per liter bensin (rata-rata, sumber global/studi lokal)
  carDiesel: 2.6, // kg CO2e per liter solar (rata-rata, sumber global/studi lokal)
  carElectric: 0.05, // kg CO2e per km (dari produksi listrik di Indonesia, perkiraan)
  motorcycleGasoline: 2.0, // kg CO2e per liter bensin (rata-rata, sumber global/studi lokal)
  motorcycleDiesel: 2.3, // kg CO2e per liter solar (rata-rata, sumber global/studi lokal)
  bus: 0.1, // kg CO2e per km per orang (perkiraan umum, bisa bervariasi)
  train: 0.05, // kg CO2e per km per orang (perkiraan umum, umumnya lebih efisien)

  // Energi Rumah Tangga
  // Faktor emisi PLN di Indonesia sering disebut sekitar 0.8 - 0.85 kg CO2e/kWh.
  // Faktor emisi LPG 3 kg/kg berdasarkan beberapa laporan.
  electricity: 0.8, // kg CO2e per kWh (rata-rata emisi grid listrik Indonesia)
  gasLPG: 3.0, // kg CO2e per kg LPG (berdasarkan konversi dan studi)

  // Makanan
  // Angka-angka ini adalah estimasi global yang sering dikutip, yang juga relevan untuk konteks Indonesia.
  // Emisi daging merah (sapi/kambing) jauh lebih tinggi. Nasi juga memiliki emisi signifikan.
  redMeat: 27, // kg CO2e per kg (estimasi global, konsisten dengan data sapi/kambing)
  chicken: 6.9, // kg CO2e per kg (estimasi global)
  rice: 2.7, // kg CO2e per kg (estimasi global, produksi padi signifikan)
  vegetables: 0.7, // kg CO2e per kg (estimasi global, rendah)
};

// Fungsi untuk menampilkan halaman yang dipilih
function showPage(pageId) {
  // Sembunyikan semua halaman
  for (let id in pages) {
    pages[id].classList.add("hidden");
  }
  // Tampilkan halaman yang dipilih
  pages[pageId].classList.remove("hidden");

  // Hapus kelas aktif dari semua tombol navigasi
  for (let id in navButtons) {
    if (navButtons[id]) {
      // Pastikan tombol ada
      navButtons[id].classList.remove("active");
    }
  }
  // Tambahkan kelas aktif ke tombol navigasi yang dipilih
  if (navButtons[pageId]) {
    // Pastikan tombol ada
    navButtons[pageId].classList.add("active");
  }
}

// Fungsi untuk menangani perubahan input
function handleInputChange(category, field, value) {
  emissionData[category][field] = value;
  calculateTotalEmissions();
}

// Fungsi untuk menghitung total emisi
function calculateTotalEmissions() {
  let emissions = 0;

  // Transportasi
  const trans = emissionData.transportation;
  const carDist = parseFloat(trans.carDistance) || 0;
  if (carDist > 0) {
    if (trans.carFuelType === "gasoline") {
      emissions += (carDist / 10) * emissionFactors.carGasoline; // liter bensin
    } else if (trans.carFuelType === "diesel") {
      emissions += (carDist / 12) * emissionFactors.carDiesel; // liter solar
    } else if (trans.carFuelType === "electric") {
      emissions += carDist * emissionFactors.carElectric; // km
    }
  }
  const motorDist = parseFloat(trans.motorcycleDistance) || 0;
  if (motorDist > 0) {
    if (trans.motorcycleFuelType === "gasoline") {
      emissions += (motorDist / 30) * emissionFactors.motorcycleGasoline; // liter bensin
    } else if (trans.motorcycleFuelType === "diesel") {
      emissions += (motorDist / 35) * emissionFactors.motorcycleDiesel; // liter solar
    }
  }
  emissions += (parseFloat(trans.busDistance) || 0) * emissionFactors.bus;
  emissions += (parseFloat(trans.trainDistance) || 0) * emissionFactors.train;

  // Energi Rumah Tangga
  const home = emissionData.homeEnergy;
  emissions +=
    (parseFloat(home.electricityKwh) || 0) * emissionFactors.electricity;
  emissions += (parseFloat(home.gasKg) || 0) * emissionFactors.gasLPG;

  // Makanan
  const food = emissionData.food;
  emissions += (parseFloat(food.redMeatKg) || 0) * emissionFactors.redMeat;
  emissions += (parseFloat(food.chickenKg) || 0) * emissionFactors.chicken;
  emissions += (parseFloat(food.riceKg) || 0) * emissionFactors.rice;
  emissions +=
    (parseFloat(food.vegetablesKg) || 0) * emissionFactors.vegetables;

  totalEmissionsResult.textContent = `${emissions.toFixed(2)} kg CO2e`;
}

// Fungsi untuk mereset kalkulator
function resetCalculator() {
  emissionData = {
    transportation: {
      carDistance: "",
      carFuelType: "gasoline",
      motorcycleDistance: "",
      motorcycleFuelType: "gasoline",
      busDistance: "",
      trainDistance: "",
    },
    homeEnergy: {
      electricityKwh: "",
      gasKg: "",
    },
    food: {
      redMeatKg: "",
      chickenKg: "",
      riceKg: "",
      vegetablesKg: "",
    },
  };

  // Reset input fields
  document.getElementById("carDistance").value = "";
  document.getElementById("carFuelType").value = "gasoline";
  document.getElementById("motorcycleDistance").value = "";
  document.getElementById("motorcycleFuelType").value = "gasoline";
  document.getElementById("busDistance").value = "";
  document.getElementById("trainDistance").value = "";
  document.getElementById("electricityKwh").value = "";
  document.getElementById("gasKg").value = "";
  document.getElementById("redMeatKg").value = "";
  document.getElementById("chickenKg").value = "";
  document.getElementById("riceKg").value = "";
  document.getElementById("vegetablesKg").value = "";

  calculateTotalEmissions(); // Hitung ulang untuk menampilkan 0.00
  showPage("home"); // Kembali ke halaman utama
}

// Event Listeners untuk navigasi
navButtons.transportation.addEventListener("click", () =>
  showPage("transportation")
);
navButtons.homeEnergy.addEventListener("click", () => showPage("homeEnergy"));
navButtons.food.addEventListener("click", () => showPage("food"));
navButtons.results.addEventListener("click", () => showPage("results"));

// Event Listener untuk tombol restart
restartButton.addEventListener("click", resetCalculator);

// Event Listeners untuk input fields (transportasi)
document
  .getElementById("carDistance")
  .addEventListener("input", (e) =>
    handleInputChange("transportation", "carDistance", e.target.value)
  );
document
  .getElementById("carFuelType")
  .addEventListener("change", (e) =>
    handleInputChange("transportation", "carFuelType", e.target.value)
  );
document
  .getElementById("motorcycleDistance")
  .addEventListener("input", (e) =>
    handleInputChange("transportation", "motorcycleDistance", e.target.value)
  );
document
  .getElementById("motorcycleFuelType")
  .addEventListener("change", (e) =>
    handleInputChange("transportation", "motorcycleFuelType", e.target.value)
  );
document
  .getElementById("busDistance")
  .addEventListener("input", (e) =>
    handleInputChange("transportation", "busDistance", e.target.value)
  );
document
  .getElementById("trainDistance")
  .addEventListener("input", (e) =>
    handleInputChange("transportation", "trainDistance", e.target.value)
  );

// Event Listeners untuk input fields (energi rumah)
document
  .getElementById("electricityKwh")
  .addEventListener("input", (e) =>
    handleInputChange("homeEnergy", "electricityKwh", e.target.value)
  );
document
  .getElementById("gasKg")
  .addEventListener("input", (e) =>
    handleInputChange("homeEnergy", "gasKg", e.target.value)
  );

// Event Listeners untuk input fields (makanan)
document
  .getElementById("redMeatKg")
  .addEventListener("input", (e) =>
    handleInputChange("food", "redMeatKg", e.target.value)
  );
document
  .getElementById("chickenKg")
  .addEventListener("input", (e) =>
    handleInputChange("food", "chickenKg", e.target.value)
  );
document
  .getElementById("riceKg")
  .addEventListener("input", (e) =>
    handleInputChange("food", "riceKg", e.target.value)
  );
document
  .getElementById("vegetablesKg")
  .addEventListener("input", (e) =>
    handleInputChange("food", "vegetablesKg", e.target.value)
  );

// Inisialisasi: Tampilkan halaman "home" saat pertama kali dimuat
document.addEventListener("DOMContentLoaded", () => {
  showPage("home");
  calculateTotalEmissions(); // Hitung emisi awal (akan 0.00)
});

// Listener tombol Next dan Previous
document.querySelectorAll(".next-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const next = button.getAttribute("data-next");
    showPage(next);
  });
});

document.querySelectorAll(".prev-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const prev = button.getAttribute("data-prev");
    showPage(prev);
  });
});
