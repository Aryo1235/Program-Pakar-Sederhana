// Pengetahuan tentang berbagai penyakit dan gejala yang terkait
// Pengetahuan tentang berbagai penyakit dan gejala yang terkait

function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

// Fungsi untuk menutup modal ketika tombol Close atau area di luar modal diklik
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
var knowledgeBase = [
  {
    symptoms: [
      "tekanan darah tinggi",
      "urin berdarah",
      "peningkatan frekuensi buang air kecil",
    ],
    diagnosis: "glomerulonefritis",
    // Prioritas diagnosis: 1 - rendah, 2 - sedang, 3 - tinggi
  },
  {
    symptoms: [
      "pembengkakan pada kaki",
      "kelelahan berlebihan",
      "sering merasa haus",
    ],
    diagnosis: "gagal ginjal kronis",
  },
  {
    symptoms: ["nyeri pinggang", "kehilangan nafsu makan", "mual", "demam"],
    diagnosis: "batu ginjal",
  },
  {
    symptoms: [
      "berat badan turun drastis",
      "nyeri pada perut",
      "perubahan warna kulit",
      "demam tinggi yang tidak mereda",
    ],
    diagnosis: "kanker ginjal",
  },
  {
    symptoms: [
      "sakit kepala",
      "mual",
      "muntah",
      "keluhan penglihatan",
      "denyut nadi cepat",
    ],
    diagnosis: "hipertensi",
  },
  // Tambahkan gejala baru pada penyakit di sini
];

// Fungsi untuk mendapatkan diagnosis berdasarkan gejala yang dipilih
function getDiagnosis() {
  console.log(knowledgeBase);
  var symptoms = [];
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  checkboxes.forEach(function (checkbox) {
    symptoms.push(checkbox.value);
  });

  if (symptoms.length === 0) {
    alert("Silakan pilih setidaknya satu gejala.");
    return;
  }

  var maxSymptomsAllowed = 8; // Jumlah maksimum gejala sebelum disarankan ke dokter

  if (symptoms.length > maxSymptomsAllowed) {
    document.getElementById("diagnosis").innerHTML =
      "Anda telah memilih terlalu banyak gejala. Kami sarankan Anda untuk segera berkonsultasi dengan dokter.";
    document.getElementById("treatment").innerHTML = "";
    return;
  }

  var matchedDiagnoses = []; // Untuk menyimpan semua diagnosis yang cocok
  for (var i = 0; i < knowledgeBase.length; i++) {
    var rule = knowledgeBase[i];
    var matchedSymptomsCount = 0;
    for (var j = 0; j < rule.symptoms.length; j++) {
      if (symptoms.indexOf(rule.symptoms[j]) !== -1) {
        matchedSymptomsCount++;
      }
    }
    //jumlah minimal yang terpilih dari 1 penyakit
    if (matchedSymptomsCount >= 2) {
      matchedDiagnoses.push(rule);
    }
  }

  if (matchedDiagnoses.length === 0) {
    document.getElementById("diagnosis").innerHTML =
      "Diagnosis tidak ditemukan";
    return;
  }

  var diagnosisHTML = "Diagnosis:<br>";
  var treatmentHTML = "Perawatan:<br>";

  for (var k = 0; k < matchedDiagnoses.length; k++) {
    var matchedDiagnosis = matchedDiagnoses[k];
    diagnosisHTML += matchedDiagnosis.diagnosis + "<br>";
    switch (matchedDiagnosis.diagnosis) {
      case "glomerulonefritis":
        treatmentHTML +=
          "Perawatan glomerulonefritis termasuk pengaturan diet rendah garam dan rendah protein, serta penggunaan obat antiinflamasi untuk mengurangi peradangan.<br>";
        break;
      case "gagal ginjal kronis":
        treatmentHTML +=
          "Perawatan gagal ginjal kronis meliputi pengelolaan tekanan darah dan gula darah, diet rendah garam, dan terapi penggantian ginjal jika diperlukan.<br>";
        break;
      case "batu ginjal":
        treatmentHTML +=
          "Perawatan batu ginjal tergantung pada ukuran dan tingkat keparahan, mungkin termasuk obat penghancur batu, terapi cahaya untuk menghancurkan batu, atau prosedur pembedahan.<br>";
        break;
      case "kanker ginjal":
        treatmentHTML +=
          "Perawatan kanker ginjal dapat melibatkan operasi pengangkatan tumor, kemoterapi, radioterapi, atau terapi target.<br>";
        break;
      case "hipertensi":
        treatmentHTML +=
          "Perawatan hipertensi termasuk perubahan gaya hidup seperti diet rendah garam dan tinggi kalium, olahraga teratur, dan jika perlu, penggunaan obat antihipertensi.<br>";
        break;
      // Tambahkan saran dan perawatan untuk diagnosis lain di sini
      default:
        // Sisakan pesan default jika diagnosis tidak cocok dengan yang ada dalam aturan
        break;
    }
  }

  document.getElementById("diagnosis").innerHTML = diagnosisHTML;
  document.getElementById("treatment").innerHTML = treatmentHTML;
}
