import { calculateDose } from "./calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  const concentrationInput = document.getElementById("concentration");
  const weightConcentrationInput = document.getElementById(
    "weight-concentration"
  );
  const patientWeightInput = document.getElementById("patient-weight");
  const dosesPerDayInput = document.getElementById("doses-per-day");
  const resultAmount = document.getElementById("result-amount");
  const resultDose = document.getElementById("result-dose");

  function calculate() {
    const amount = calculateDose(
      parseFloat(concentrationInput.value),
      parseFloat(weightConcentrationInput.value),
      parseFloat(patientWeightInput.value)
    );
    const dosesPerDay = parseFloat(dosesPerDayInput.value);

    resultAmount.textContent =
      amount === null
        ? "Benötigte Medikamentenmenge: "
        : `Benötigte Medikamentenmenge: ${amount.toFixed(2)} ml/Tag`;

    resultDose.textContent =
      amount === null || !Number.isFinite(dosesPerDay) || dosesPerDay <= 0
        ? "Dosis/Gabe: "
        : `Dosis/Gabe: ${(amount / dosesPerDay).toFixed(2)} ml/Dosis`;
  }

  concentrationInput.addEventListener("input", calculate);
  weightConcentrationInput.addEventListener("input", calculate);
  patientWeightInput.addEventListener("input", calculate);
  dosesPerDayInput.addEventListener("input", calculate);
});
