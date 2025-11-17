import { anomalyCheck } from "../src/core/utils";

describe("anomalyCheck", () => {
  test("returns irregular: false for stable cycles", () => {
    const intervals = [28, 29, 28, 27, 29];
    const result = anomalyCheck(intervals);

    console.log("STABLE RESULT:", result);

    expect(result.irregular).toBe(false);
  });

  test("returns irregular: true for unstable cycles", () => {
    const intervals = [20, 35, 40]; // high variation
    const result = anomalyCheck(intervals);

    console.log("IRREGULAR RESULT:", result);

    expect(result.irregular).toBe(true);
    expect(result.message).toBe("Your cycles vary more than usual.");
  });

  test("returns false if not enough data", () => {
    const result = anomalyCheck([28]);
    console.log("NOT ENOUGH DATA:", result);

    expect(result.irregular).toBe(false);
  });
});
