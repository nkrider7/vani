import { HistoryInput, PredictionResult } from "../types";
import { daysBetween, addDaysIso, mean, std, clamp, anomalyCheck } from "./utils";

function computeIntervals(entries: HistoryInput["periodStarts"]): number[] {
  const intervals: number[] = [];
  for (let i = 0; i + 1 < entries.length; i++) {
    intervals.push(daysBetween(entries[i].date, entries[i + 1].date));
  }
  return intervals;
}

export function wmaPredict(history: HistoryInput): PredictionResult {
  const entries = [...history.periodStarts];
  if (entries.length < 1) throw new Error("need at least one period start");

  const intervals = computeIntervals(entries);
  const last = entries[entries.length - 1].date;

  if (intervals.length === 0) {
    const likely = addDaysIso(last, 28);
    return {
      likely,
      confidence: 0.2,
      notes: ["Not enough data for a reliable prediction, using a 28-day cycle as a fallback."],
    };
  }

  // weights: more recent intervals get larger weight
  const n = intervals.length;
  const rawWeights = intervals.map((_, i) => Math.pow(2, i + 1)); // older -> smaller (we'll normalize reversed)
  // reverse so last interval gets highest weight
  rawWeights.reverse();
  const weightSum = rawWeights.reduce((s, v) => s + v, 0);
  const wma = intervals.reduce(
    (s, v, i) => s + v * (rawWeights[i] / weightSum),
    0
  );
  const predictedInterval = Math.round(wma);
  const likely = addDaysIso(last, predictedInterval);

  const s = std(intervals);
  const base = clamp((n - 1) / 10, 0, 0.8);
  const stability = clamp(1 - s / 10, 0, 1);
  const confidence = clamp(base * 0.5 + stability * 0.5, 0, 1);

  const windowRadius = Math.min(3, Math.max(1, Math.round(s / 2)));
  const start = addDaysIso(likely, -windowRadius);
  const end = addDaysIso(likely, windowRadius);

  const notes = [
    `Predicted cycle length is ${predictedInterval} days (based on a weighted average of recent cycles).`,
  ];

  const anomaly = anomalyCheck(intervals);
  if (anomaly.irregular) {
    notes.push(anomaly.message!);
  }

  if (s < 2) {
    notes.push("Your cycles are very regular. Prediction reliability is high.");
  } else if (s < 4) {
    notes.push("Recent cycles are stable. Prediction reliability is good.");
  } else {
    notes.push("Cycle variance is slightly higher, which may affect prediction accuracy.");
  }

  return { likely, window: { start, end }, confidence, notes };
}
