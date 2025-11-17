import {
  PredictorConfig,
  HistoryInput,
  PredictionResult,
  FertileWindow,
  PregnancyPrediction
} from "../types";

import { DEFAULTS } from "../constants";
import { calendarPredict } from "../core/calendarStrategy";
import { wmaPredict } from "../core/wmaStrategy";
import { addDaysIso } from "../core/utils";

type StrategyFn = (history: HistoryInput, config?: PredictorConfig) => PredictionResult;

export class PredictionEngine {
  private config: PredictorConfig;
  private strategies: Map<string, StrategyFn> = new Map();

  constructor(config?: PredictorConfig) {
    this.config = { ...DEFAULTS, ...config };

    // default strategies
    this.registerStrategy("calendar", (h) => calendarPredict(h));
    this.registerStrategy("wma", (h) => wmaPredict(h));
  }

  registerStrategy(name: string, fn: StrategyFn) {
    this.strategies.set(name, fn);
  }

  private chooseStrategy(name?: string): StrategyFn {
    const key = name || this.config.strategy || "wma";
    const fn = this.strategies.get(key);
    if (!fn) throw new Error(`Strategy '${key}' not found`);
    return fn;
  }

  // ---------------------------------------------
  // PERIOD PREDICTION
  // ---------------------------------------------
  predictNextPeriod(history: HistoryInput): PredictionResult {
    const fn = this.chooseStrategy(this.config.strategy);
    return fn(history, this.config);
  }

  // ---------------------------------------------
  // OVULATION
  // ---------------------------------------------
  predictOvulation(history: HistoryInput): PredictionResult {
    const next = this.predictNextPeriod(history);
    const luteal = this.config.lutealPhaseDays ?? DEFAULTS.lutealPhaseDays;

    const ovulationDate = addDaysIso(next.likely, -luteal);

    const notes = [
      ...(next.notes || []),
      `estimated ovulation = ${ovulationDate}`
    ];

    return {
      likely: ovulationDate,
      confidence: next.confidence,
      notes
    };
  }

  // ---------------------------------------------
  // FERTILE WINDOW
  // ---------------------------------------------
  predictFertileWindow(history: HistoryInput): FertileWindow {
    const ov = this.predictOvulation(history);

    const start = addDaysIso(ov.likely, -5);
    const end = addDaysIso(ov.likely, 1);

    return {
      start,
      peak: ov.likely,
      end,
      confidence: ov.confidence,
      notes: ov.notes
    };
  }

  // ---------------------------------------------
  // PREGNANCY PREDICTION
  // ---------------------------------------------
  predictPregnancy(lastPeriodIso: string): PregnancyPrediction {
    const dueDate = addDaysIso(lastPeriodIso, 280);

    const today = new Date();
    const ms = today.getTime() - new Date(lastPeriodIso).getTime();
    const daysSince = Math.round(ms / (1000 * 60 * 60 * 24));

    const currentWeek = Math.max(0, Math.floor(daysSince / 7) + 1);
    const currentTrimester = Math.min(3, Math.ceil(currentWeek / 13));

    return {
      dueDate,
      currentWeek,
      currentTrimester
    };
  }

  // ---------------------------------------------
  // ANALYZE WITH ALL STRATEGIES
  // ---------------------------------------------
  analyze(history: HistoryInput) {
    const results: Record<string, PredictionResult> = {};

    for (const [name, fn] of this.strategies.entries()) {
      try {
        results[name] = fn(history, this.config);
      } catch {
        // ignore failing strategies
      }
    }

    return results;
  }
}
