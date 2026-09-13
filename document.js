import { calculateDose } from "./calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  const concentrationInput = document.getElementById("concentration");
  const weightConcentrationInput = document.getElementById(
    "weight-concentration"
  );
  const patientWeightInput = document.getElementById("patient-weight");
  const resultAmount = document.getElementById("result-amount");

  function calculate() {
    const amount = calculateDose(
      parseFloat(concentrationInput.value),
      parseFloat(weightConcentrationInput.value),
      parseFloat(patientWeightInput.value)
    );

    resultAmount.textContent =
      amount === null
        ? "Benötigte Medikamentenmenge: "
        : `Benötigte Medikamentenmenge: ${amount.toFixed(2)} ml`;
  }

  concentrationInput.addEventListener("input", calculate);
  weightConcentrationInput.addEventListener("input", calculate);
  patientWeightInput.addEventListener("input", calculate);
});
