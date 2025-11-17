# vani-cycle

A TypeScript library for menstrual cycle predictions.

`vani-cycle` provides a flexible prediction engine to forecast menstrual cycles, ovulation, and fertile windows based on historical data. It's designed to be simple to use and integrate into your applications.

## Features

- Predict the next menstrual period.
- Estimate the ovulation day.
- Calculate the fertile window.
- Multiple prediction strategies (Weighted Moving Average, simple Calendar average).
- Analyze cycle history with all available strategies.
- TypeScript ready.

## Installation

Install the package using npm:

```bash
npm install vani-cycle
```

## Usage

Here's a simple example of how to use the `PredictionEngine`:

```typescript
import { PredictionEngine } from "vani-cycle";

// Initialize the engine with a strategy (e.g., 'wma' or 'calendar')
const engine = new PredictionEngine({ strategy: "wma" });

// Provide a history of period start dates
const history = {
  periodStarts: [
    { date: "2025-01-02" },
    { date: "2025-01-30" },
    { date: "2025-02-27" }
  ]
};

// Get predictions
const nextPeriod = engine.predictNextPeriod(history);
console.log("Next period prediction:", nextPeriod);

const ovulation = engine.predictOvulation(history);
console.log("Ovulation prediction:", ovulation);

const fertileWindow = engine.predictFertileWindow(history);
console.log("Fertile window:", fertileWindow);

// You can also analyze the history with all available strategies
const analysis = engine.analyze(history);
console.log("Analysis with all strategies:", analysis);
```

### Example Output

```json
{
  "nextPeriod": {
    "likely": "2025-03-27",
    "confidence": 0.65,
    "notes": [
      "wma 27.50d",
      "pred interval 28d",
      "std 0.71d"
    ]
  },
  "ovulation": {
    "likely": "2025-03-13",
    "confidence": 0.65,
    "notes": [
      "wma 27.50d",
      "pred interval 28d",
      "std 0.71d",
      "estimated ovulation = 2025-03-13"
    ]
  },
  "fertileWindow": {
    "start": "2025-03-08",
    "peak": "2025-03-13",
    "end": "2025-03-14",
    "confidence": 0.65,
    "notes": [
      "wma 27.50d",
      "pred interval 28d",
      "std 0.71d",
      "estimated ovulation = 2025-03-13"
    ]
  }
}
```

## API

### `PredictionEngine(config?: PredictorConfig)`

Creates a new prediction engine instance.

**Config:**

- `strategy`: The prediction strategy to use. Can be `"wma"` (default) or `"calendar"`.
- `lutealPhaseDays`: The number of days in the luteal phase (default: 14).

### Methods

- `predictNextPeriod(history: HistoryInput): PredictionResult`
- `predictOvulation(history: HistoryInput): PredictionResult`
- `predictFertileWindow(history: HistoryInput): FertileWindow`
- `predictPregnancy(lastPeriodIso: string): PregnancyPrediction`
- `analyze(history: HistoryInput): Record<string, PredictionResult>`

## Strategies

`vani-cycle` comes with two built-in prediction strategies:

- **`wma` (Weighted Moving Average):** This is the default strategy. It calculates the average cycle length but gives more weight to recent cycles, making it more responsive to changes in cycle patterns.
- **`calendar`:** A simpler strategy that calculates the unweighted average of all past cycle lengths.

You can also register your own custom prediction strategies.

## License

This project is licensed under the MIT License.
