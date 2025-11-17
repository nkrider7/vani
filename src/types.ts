export type ISODateStr = string; // YYYY-MM-DD

export interface PeriodEntry {
  date: ISODateStr;
}

export interface DailyLog {
  date: ISODateStr;
  temperature?: number; // BBT
  cervicalMucus?: "dry" | "sticky" | "creamy" | "watery" | "eggwhite";
  stress?: 1 | 2 | 3 | 4 | 5;
  sleepHours?: number;
  symptoms?: string[];
}

export interface HistoryInput {
  periodStarts: PeriodEntry[]; // chronological earliest->latest
  dailyLogs?: DailyLog[];
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
