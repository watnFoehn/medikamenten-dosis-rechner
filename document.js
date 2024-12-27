document.addEventListener("DOMContentLoaded", () => {
  const concentrationInput = document.getElementById("concentration");
  const weightConcentrationInput = document.getElementById(
    "weight-concentration"
  );
  const patientWeightInput = document.getElementById("patient-weight");
  const resultAmount = document.getElementById("result-amount");

  function calculate() {
    const concentration = parseFloat(concentrationInput.value);
    const weightConcentration = parseFloat(weightConcentrationInput.value);
    const patientWeight = parseFloat(patientWeightInput.value);

    if (
      !isNaN(concentration) &&
      !isNaN(weightConcentration) &&
      !isNaN(patientWeight) &&
      concentration > 0 &&
      weightConcentration > 0 &&
      patientWeight > 0
    ) {
      const amount = (
        (weightConcentration * patientWeight) /
        concentration
      ).toFixed(2);
      resultAmount.textContent = `Benötigte Medikamentenmenge: ${amount} ml`;
    } else {
      resultAmount.textContent = "Benötigte Medikamentenmenge: ";
    }
  }

  concentrationInput.addEventListener("input", calculate);
  weightConcentrationInput.addEventListener("input", calculate);
  patientWeightInput.addEventListener("input", calculate);
});
