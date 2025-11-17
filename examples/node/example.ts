import { PredictionEngine } from "../../src/api/PredictionEngine";

const engine = new PredictionEngine({ strategy: "wma" });

const history = {
  periodStarts: [
    { date: "2025-01-02" },
    { date: "2025-01-30" },
    { date: "2025-02-27" }
  ]
};

console.log("next:", engine.predictNextPeriod(history));
console.log("ovulation:", engine.predictOvulation(history));
console.log("fertile:", engine.predictFertileWindow(history));
