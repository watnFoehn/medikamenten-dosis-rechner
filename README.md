# Medikamenten-Dosis-Rechner

Ein kleiner Rechner zur Umrechnung einer gewichtsbezogenen Dosierung in das benötigte Volumen eines flüssigen Medikaments.

## Berechnung

**Benötigtes Volumen (ml) = (Dosis (mg/kg) × Körpergewicht (kg)) ÷ Konzentration (mg/ml)**

Beispiel: Bei 10 mg/kg, 20 kg Körpergewicht und einer Konzentration von 40 mg/ml ergibt sich ein Volumen von 5 ml.

## Sicherheitshinweis

**Wichtig:** Dieser Rechner dient ausschließlich zur rechnerischen Unterstützung. Er ersetzt keine ärztliche oder pharmazeutische Beratung. Die Dosierung und Anwendung eines Medikaments muss immer anhand der konkreten ärztlichen Verordnung bzw. der offiziellen Fachinformation erfolgen. Bei Unsicherheit bitte einen Arzt oder Apotheker konsultieren.

## Entwicklung

Die Anwendung ist eine statische HTML/CSS/JavaScript-Anwendung und benötigt keinen Build-Schritt.

Tests können mit Node.js ausgeführt werden:

```bash
npm test
```

Die Tests laufen außerdem automatisch über GitHub Actions bei Pushes und Pull Requests.
