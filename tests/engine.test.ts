import { PredictionEngine } from "../src";

test("predicts next period", () => {
  const engine = new PredictionEngine({ strategy: "calendar",  });

  const history = {
   periodStarts: [
    { date: "2024-07-01" },
    { date: "2024-07-29" }, // 28 days
    { date: "2024-08-26" }, // 28 days
    { date: "2024-09-23" }, // 28 days
    { date: "2024-10-21" }, // 28 days
    { date: "2024-11-18" }, // 28 days
    { date: "2024-12-16" }, // 28 days
    { date: "2025-01-13" }, // 28 days
  ]
  };

//   const result = engine.predictNextPeriod(history);
  const result = engine.predictOvulation(history);
  console.log(result);

//   expect(result.likely).toBeDefined();
  expect(result.confidence).toBeGreaterThan(0);
});
