export type ISODateStr = string; // YYYY-MM-DD

export interface PeriodEntry {
  date: ISODateStr;
}

export interface HistoryInput {
  periodStarts: PeriodEntry[]; // chronological earliest->latest or latest->earliest (we'll accept earliest->latest)
  cycleLengths?: number[];
}

export interface PredictorConfig {
  strategy?: "wma" | "calendar" | string;
  lutealPhaseDays?: number; // default 14
  timezone?: string; // e.g., 'Asia/Kolkata'
  irregularityStdThreshold?: number; // default 4
  minIntervalsForConfidence?: number; // default 3
}

export interface PredictionResult {
  likely: ISODateStr;
  window?: { start: ISODateStr; end: ISODateStr };
  confidence: number; // 0..1
  notes?: string[];
}

export interface FertileWindow {
  start: ISODateStr;
  peak?: ISODateStr;
  end: ISODateStr;
  confidence: number;
  notes?: string[];
}

export interface PregnancyPrediction {
  dueDate: ISODateStr;
  currentWeek: number;
  currentTrimester: number;
}
