import { HistoryInput, PredictionResult } from "../types";
import { daysBetween, addDaysIso, mean, std, clamp } from "./utils";

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
      notes: ["not enough data, used fallback 28d"],
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
    `avg interval ${avg}d`,
    `std ${s.toFixed(2)}d`,
    `samples ${intervals.length}`,
  ];

  return { likely, window: { start, end }, confidence, notes };
}
