var knowledgeBase = [
  {
    symptoms: [
      "tekanan darah tinggi",
      "urin berdarah",
      "peningkatan frekuensi buang air kecil",
      "kelelahan berlebihan",
      "bengkak di sekitar mata",
    ],
    diagnosis: "glomerulonefritis",
  },
  {
    symptoms: [
      "pembengkakan pada kaki",
      "kelelahan berlebihan",
      "sering merasa haus",
      "kulit gatal",
      "mual",
    ],
    diagnosis: "gagal ginjal kronis",
  },
  {
    symptoms: [
      "nyeri pinggang",
      "kehilangan nafsu makan",
      "mual",
      "demam",
      "urin berdarah",
    ],
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

function getDiagnosis() {
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
    document.getElementById("percentage").innerHTML = "";
    return;
  }

  var matchedDiagnoses = [];
  var singleSymptomDiagnoses = [];

  for (var i = 0; i < knowledgeBase.length; i++) {
    var rule = knowledgeBase[i];
    var matchedSymptomsCount = 0;
    for (var j = 0; j < rule.symptoms.length; j++) {
      if (symptoms.indexOf(rule.symptoms[j]) !== -1) {
        matchedSymptomsCount++;
      }
    }

    if (matchedSymptomsCount >= 2) {
      var percentage = (matchedSymptomsCount / rule.symptoms.length) * 100;
      matchedDiagnoses.push({
        diagnosis: rule.diagnosis,
        percentage: percentage,
      });
    } else if (matchedSymptomsCount === 1) {
      singleSymptomDiagnoses.push(rule.diagnosis);
    }
  }

  if (matchedDiagnoses.length === 0) {
    if (singleSymptomDiagnoses.length > 1) {
      // Jika ada satu gejala yang cocok dengan lebih dari satu penyakit
      var diagnosisHTML = "Kemungkinan Diagnosis:<br>";
      for (var k = 0; k < singleSymptomDiagnoses.length; k++) {
        diagnosisHTML += singleSymptomDiagnoses[k] + "<br>";
      }
      document.getElementById("diagnosis").innerHTML = diagnosisHTML;
      document.getElementById("percentage").innerHTML = "";
      document.getElementById("treatment").innerHTML =
        "Kami sarankan Anda untuk berkonsultasi dengan dokter umum untuk diagnosis lebih lanjut.";
    } else {
      // Jika hanya satu gejala yang cocok dengan satu penyakit
      document.getElementById("diagnosis").innerHTML =
        "Anda mungkin memiliki gejala yang menunjukkan penyakit lain. Kami sarankan Anda untuk berkonsultasi dengan dokter umum.";
      document.getElementById("percentage").innerHTML = "";
      document.getElementById("treatment").innerHTML = "";
    }
    return;
  }

  var diagnosisHTML = "Diagnosis:<br>";
  var treatmentHTML = "Perawatan:<br>";
  var highestPercentage = 0;
  var highestDiagnosis = "";

  for (var l = 0; l < matchedDiagnoses.length; l++) {
    var matchedDiagnosis = matchedDiagnoses[l];
    diagnosisHTML += matchedDiagnosis.diagnosis + "<br>";
    diagnosisHTML +=
      "Persentase Kemungkinan: " +
      matchedDiagnosis.percentage.toFixed(2) +
      "%<br>";

    if (matchedDiagnosis.percentage > highestPercentage) {
      highestPercentage = matchedDiagnosis.percentage;
      highestDiagnosis = matchedDiagnosis.diagnosis;
    }
  }

  document.getElementById("diagnosis").innerHTML = diagnosisHTML;
  document.getElementById("percentage").innerHTML =
    "Persentase Kemungkinan Terkena: " + highestPercentage.toFixed(2) + "%";

  switch (highestDiagnosis) {
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
    default:
      break;
  }

  document.getElementById("treatment").innerHTML = treatmentHTML;
}

function clearSelection() {
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });

  document.getElementById("diagnosis").innerHTML = "";
  document.getElementById("percentage").innerHTML = "";
  document.getElementById("treatment").innerHTML = "";
}
