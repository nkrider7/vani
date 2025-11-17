import { HistoryInput, PredictionResult } from "../types";
import { daysBetween, addDaysIso, mean, std, clamp, anomalyCheck } from "./utils";

export function calendarPredict(history: HistoryInput): PredictionResult {
  const entries = [...history.periodStarts];
  if (entries.length < 1) throw new Error("need at least one period start");
  // ensure chronological earliest -> latest
  // assuming client sends earliest->latest; if not, caller should sort
  const intervals: number[] = [];
  for (let i = 0; i + 1 < entries.length; i++) {
    intervals.push(daysBetween(entries[i].date, entries[i + 1].date));
  }

  const last = entries[entries.length - 1].date;

  if (intervals.length === 0) {
    // cannot compute intervals: fallback to next = last + 28
    const likely = addDaysIso(last, 28);
    return {
      likely,
      confidence: 0.2,
      notes: ["Not enough data for a reliable prediction, using a 28-day cycle as a fallback."],
    };
  }

  const avg = Math.round(mean(intervals));
  const s = std(intervals);

  const likely = addDaysIso(last, avg);

  const windowRadius = Math.min(3, Math.max(1, Math.round(s / 2)));
  const start = addDaysIso(likely, -windowRadius);
  const end = addDaysIso(likely, windowRadius);

  // confidence: base on sample size and std
  const base = clamp((intervals.length - 1) / 10, 0, 0.8); // more samples -> higher
  const stability = clamp(1 - s / 10, 0, 1);
  const confidence = clamp(base * 0.6 + stability * 0.4, 0, 1);

  const notes = [
    `Your average cycle length is ${avg} days.`,
    `Based on ${intervals.length} cycles.`,
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
