import { calculateDose } from "./calculator.js";

const translations = {
  de: {
    title: "Medikamenten-Dosis-Rechner",
    concentration: "Konzentration (mg/ml):",
    weightConcentration: "Gewichtskonzentration (mg/kg):",
    patientWeight: "Gewicht Patient (kg):",
    dosesPerDay: "Dosen/Tag:",
    result: "Ergebnis",
    amount: "Benötigte Medikamentenmenge:",
    dose: "Dosis/Gabe:",
    disclaimerHeading: "Wichtiger Hinweis:",
    disclaimer:
      "Dieser Rechner dient ausschließlich zur rechnerischen Unterstützung. Er ersetzt keine ärztliche oder pharmazeutische Beratung. Dosierung und Anwendung eines Medikaments müssen anhand der konkreten ärztlichen Verordnung bzw. der offiziellen Fachinformation erfolgen. Bei Unsicherheit bitte einen Arzt oder Apotheker konsultieren."
  },
  en: {
    title: "Medication Dose Calculator",
    concentration: "Concentration (mg/ml):",
    weightConcentration: "Dose by body weight (mg/kg):",
    patientWeight: "Patient weight (kg):",
    dosesPerDay: "Doses/day:",
    result: "Result",
    amount: "Required medication amount:",
    dose: "Dose per administration:",
    disclaimerHeading: "Important:",
    disclaimer:
      "This calculator is intended solely as a calculation aid. It does not replace medical or pharmaceutical advice. The dosage and use of a medication must always be based on the specific medical prescription or official product information. If you are unsure, consult a doctor or pharmacist."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const concentrationInput = document.getElementById("concentration");
  const weightConcentrationInput = document.getElementById("weight-concentration");
  const patientWeightInput = document.getElementById("patient-weight");
  const dosesPerDayInput = document.getElementById("doses-per-day");
  const resultAmount = document.getElementById("result-amount");
  const resultDose = document.getElementById("result-dose");
  const languageButtons = document.querySelectorAll("[data-lang]");

  let currentLanguage = localStorage.getItem("language");
  if (!translations[currentLanguage]) {
    currentLanguage = "de";
  }

  function calculate() {
    const text = translations[currentLanguage];
    const amount = calculateDose(
      parseFloat(concentrationInput.value),
      parseFloat(weightConcentrationInput.value),
      parseFloat(patientWeightInput.value)
    );
    const dosesPerDay = parseFloat(dosesPerDayInput.value);

    resultAmount.textContent =
      amount === null
        ? text.amount
        : `${text.amount} ${amount.toFixed(2)} ml/day`;

    resultDose.textContent =
      amount === null || !Number.isFinite(dosesPerDay) || dosesPerDay <= 0
        ? text.dose
        : `${text.dose} ${(amount / dosesPerDay).toFixed(2)} ml/dose`;
  }

  function setLanguage(language) {
    currentLanguage = language;
    const text = translations[language];

    document.documentElement.lang = language;
    document.title = text.title;
    document.getElementById("page-title").textContent = text.title;
    document.getElementById("concentration-label").textContent = text.concentration;
    document.getElementById("weight-concentration-label").textContent = text.weightConcentration;
    document.getElementById("patient-weight-label").textContent = text.patientWeight;
    document.getElementById("doses-per-day-label").textContent = text.dosesPerDay;
    document.getElementById("result-heading").textContent = text.result;
    document.getElementById("disclaimer-heading").textContent = text.disclaimerHeading;
    document.getElementById("disclaimer").childNodes[1].textContent = ` ${text.disclaimer}`;

    languageButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === language));
    });

    localStorage.setItem("language", language);
    calculate();
  }

  concentrationInput.addEventListener("input", calculate);
  weightConcentrationInput.addEventListener("input", calculate);
  patientWeightInput.addEventListener("input", calculate);
  dosesPerDayInput.addEventListener("input", calculate);
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  setLanguage(currentLanguage);
});
