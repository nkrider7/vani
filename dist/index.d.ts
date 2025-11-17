type ISODateStr = string;
interface PeriodEntry {
    date: ISODateStr;
}
interface DailyLog {
    date: ISODateStr;
    temperature?: number;
    cervicalMucus?: "dry" | "sticky" | "creamy" | "watery" | "eggwhite";
    stress?: 1 | 2 | 3 | 4 | 5;
    sleepHours?: number;
    symptoms?: string[];
}
interface HistoryInput {
    periodStarts: PeriodEntry[];
    dailyLogs?: DailyLog[];
}
interface PredictorConfig {
    strategy?: "wma" | "calendar" | string;
    lutealPhaseDays?: number;
    timezone?: string;
    irregularityStdThreshold?: number;
    minIntervalsForConfidence?: number;
}
interface PredictionResult {
    likely: ISODateStr;
    window?: {
        start: ISODateStr;
        end: ISODateStr;
    };
    confidence: number;
    notes?: string[];
}
interface FertileWindow {
    start: ISODateStr;
    peak?: ISODateStr;
    end: ISODateStr;
    confidence: number;
    notes?: string[];
}
interface PregnancyPrediction {
    dueDate: ISODateStr;
    currentWeek: number;
    currentTrimester: number;
}

type StrategyFn = (history: HistoryInput, config?: PredictorConfig) => PredictionResult;
declare class PredictionEngine {
    private config;
    private strategies;
    constructor(config?: PredictorConfig);
    registerStrategy(name: string, fn: StrategyFn): void;
    private chooseStrategy;
    predictNextPeriod(history: HistoryInput): PredictionResult;
    predictOvulation(history: HistoryInput): PredictionResult;
    predictFertileWindow(history: HistoryInput): FertileWindow;
    predictPregnancy(lastPeriodIso: string): PregnancyPrediction;
    analyze(history: HistoryInput): Record<string, PredictionResult>;
}

export { DailyLog, FertileWindow, HistoryInput, ISODateStr, PeriodEntry, PredictionEngine, PredictionResult, PredictorConfig, PregnancyPrediction };
