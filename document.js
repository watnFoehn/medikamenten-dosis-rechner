import { calculateDose } from "./calculator.js";

const text = {
  de: {
    title: "Medikamenten-Dosis-Rechner",
    concentration: "Konzentration (mg/ml):",
    weight: "Gewichtskonzentration (mg/kg):",
    patient: "Gewicht Patient (kg):",
    doses: "Dosen/Tag:",
    result: "Ergebnis",
    amount: "Benötigte Medikamentenmenge:",
    dose: "Dosis/Gabe:",
    note: "Wichtiger Hinweis:",
    noteText: "Dieser Rechner dient ausschließlich zur rechnerischen Unterstützung. Er ersetzt keine ärztliche oder pharmazeutische Beratung. Dosierung und Anwendung eines Medikaments müssen anhand der konkreten ärztlichen Verordnung bzw. der offiziellen Fachinformation erfolgen. Bei Unsicherheit bitte einen Arzt oder Apotheker konsultieren."
  },
  en: {
    title: "Medication Dose Calculator",
    concentration: "Concentration (mg/ml):",
    weight: "Dose by body weight (mg/kg):",
    patient: "Patient weight (kg):",
    doses: "Doses/day:",
    result: "Result",
    amount: "Required medication amount:",
    dose: "Dose per administration:",
    note: "Important:",
    noteText: "This calculator is intended solely as a calculation aid. It does not replace medical or pharmaceutical advice. The dosage and use of a medication must always be based on the specific medical prescription or official product information. If you are unsure, consult a doctor or pharmacist."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  const container = document.querySelector(".container");
  const title = container.querySelector("h1");
  const labels = {
    concentration: container.querySelector('[for="concentration"]'),
    weight: container.querySelector('[for="weight-concentration"]'),
    patient: container.querySelector('[for="patient-weight"]'),
    doses: container.querySelector('[for="doses-per-day"]')
  };

  Object.entries(labels).forEach(([key, label]) => { label.id = `${key}-label`; });
  title.id = "page-title";

  const switcher = document.createElement("div");
  switcher.className = "language-switch";
  switcher.setAttribute("aria-label", "Sprache / Language");
  switcher.innerHTML = '<button type="button" data-lang="de" aria-pressed="true">Deutsch</button><button type="button" data-lang="en" aria-pressed="false">English</button>';
  container.insertBefore(switcher, title);

  const note = container.querySelector(".disclaimer");
  const strong = note.querySelector("strong");
  strong.id = "disclaimer-heading";
  const noteText = document.createElement("span");
  noteText.id = "disclaimer-text";
  noteText.textContent = note.textContent.replace(strong.textContent, "").trim();
  note.replaceChildren(strong, noteText);

  const inputs = [$("concentration"), $("weight-concentration"), $("patient-weight"), $("doses-per-day")];
  const amount = $("result-amount");
  const dose = $("result-dose");
  const buttons = switcher.querySelectorAll("button");
  let language = localStorage.getItem("language");
  if (!text[language]) language = "de";

  function calculate() {
    const t = text[language];
    const value = calculateDose(parseFloat(inputs[0].value), parseFloat(inputs[1].value), parseFloat(inputs[2].value));
    const count = parseFloat(inputs[3].value);
    amount.textContent = value === null ? t.amount : `${t.amount} ${value.toFixed(2)} ${language === "de" ? "ml/Tag" : "ml/day"}`;
    dose.textContent = value === null || !Number.isFinite(count) || count <= 0 ? t.dose : `${t.dose} ${(value / count).toFixed(2)} ${language === "de" ? "ml/Dosis" : "ml/dose"}`;
  }

  function setLanguage(next) {
    language = next;
    const t = text[language];
    document.documentElement.lang = language;
    document.title = t.title;
    title.textContent = t.title;
    labels.concentration.textContent = t.concentration;
    labels.weight.textContent = t.weight;
    labels.patient.textContent = t.patient;
    labels.doses.textContent = t.doses;
    $("result-heading").textContent = t.result;
    strong.textContent = t.note;
    noteText.textContent = ` ${t.noteText}`;
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === language)));
    localStorage.setItem("language", language);
    calculate();
  }

  inputs.forEach((input) => input.addEventListener("input", calculate));
  buttons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  setLanguage(language);
});
