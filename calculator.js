export function calculateDose(concentration, weightConcentration, patientWeight) {
  if (
    !Number.isFinite(concentration) ||
    !Number.isFinite(weightConcentration) ||
    !Number.isFinite(patientWeight) ||
    concentration <= 0 ||
    weightConcentration <= 0 ||
    patientWeight <= 0
  ) {
    return null;
  }

  return Number(((weightConcentration * patientWeight) / concentration).toFixed(2));
}
