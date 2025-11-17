import { calendarPredict } from "../src/core/calendarStrategy";
import { wmaPredict } from "../src/core/wmaStrategy";

const makeHistory = (arr: string[]) => ({
  periodStarts: arr.map((d) => ({ date: d }))
});

test("calendar prediction works", () => {
  const h = makeHistory(["2025-01-01", "2025-01-29", "2025-02-26"]);
  const res = calendarPredict(h);
  expect(res.likely).toBeDefined();
  expect(res.confidence).toBeGreaterThan(0);
});

test("wma prediction works", () => {
  const h = makeHistory(["2025-01-01", "2025-01-30", "2025-02-27"]);
  const res = wmaPredict(h);
  expect(res.window).toBeDefined();
  expect(res.likely).toMatch(/\d{4}-\d{2}-\d{2}/);
});
