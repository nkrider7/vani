<p align="center">
  <img src="/banner.png" alt="vani-cycle banner" />
</p>

<div align="center">

<a href="https://discord.gg/nkrider">
  <img src="https://img.shields.io/badge/Discord-%237289DA.svg?logo=discord&logoColor=white"/>
</a>
<a href="https://instagram.com/nkriderking">
  <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=instagram&logoColor=white"/>
</a>
<a href="https://www.linkedin.com/in/narendra-a90182223/">
  <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white"/>
</a>
<a href="mailto:narendranishad59@gmail.com">
  <img src="https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white"/>
</a>

<br><br>

<h2><b>TypeScript Ready • Easy to Use • All-in-One Cycle Engine</b></h2>

A TypeScript library for accurate menstrual cycle predictions, ovulation estimation, fertile windows, and cycle analytics.

<br>

</div>

---

# 🚺 **vani-cycle**

`vani-cycle` provides a flexible prediction engine for period tracking, ovulation calculations, and fertile window forecasting.  
Built to be simple, private, and easy to integrate into any app.

---

# ✨ Features

- Predict the next menstrual period
- Estimate ovulation with cycle-based math
- Calculate fertile windows
- Strategy-based prediction (WMA + Calendar)
- Cycle irregularity detection
- Confidence scores + human-friendly notes
- Fully written in TypeScript

---

# 📦 Installation

```bash
npm install vani-cycle


# 🚺 **vani-cycle**

`vani-cycle` provides a flexible cycle prediction engine built for modern apps.  
It delivers clean predictions with confidence scores, windows, and human-friendly notes.

---

# ✨ Features

- Predict the next menstrual period  
- Estimate ovulation  
- Calculate fertile windows  
- Multiple strategies (WMA, Calendar)  
- Cycle irregularity detection  
- TypeScript support  
- Easy-to-use API  
- Zero external dependencies  

---

# 📦 Installation

```bash
npm install vani-cycle
````

---

# 🚀 Quick Start

```ts
import { PredictionEngine } from "vani-cycle";

const engine = new PredictionEngine({ strategy: "wma" });

const history = {
  periodStarts: [
    { date: "2025-01-02" },
    { date: "2025-01-30" },
    { date: "2025-02-27" }
  ]
};

const nextPeriod = engine.predictNextPeriod(history);
console.log("Next period:", nextPeriod);

const ovulation = engine.predictOvulation(history);
console.log("Ovulation:", ovulation);

const fertile = engine.predictFertileWindow(history);
console.log("Fertile Window:", fertile);

const analysis = engine.analyze(history);
console.log("Strategy Comparison:", analysis);
```

---

# 📊 Example Output

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
      "estimated ovulation = 2025-03-13"
    ]
  }
}
```

---

# 📘 API Overview

### `PredictionEngine(config)`

#### Methods

| Method                          | Description                       |
| ------------------------------- | --------------------------------- |
| `predictNextPeriod(history)`    | Predict next menstrual cycle      |
| `predictOvulation(history)`     | Estimate ovulation day            |
| `predictFertileWindow(history)` | Calculate fertile range           |
| `predictPregnancy(lastPeriod)`  | Estimate due date and trimester   |
| `analyze(history)`              | Compare all prediction strategies |

---

# 🧠 Strategies

### **WMA (Weighted Moving Average)**

More accurate, gives priority to recent cycles.

### **Calendar**

Simple average of all cycle lengths.

### **Custom Strategies**

You can register your own:

```ts
engine.registerStrategy("myLogic", myStrategyFn);
```

---

# 🔍 Irregular Cycle Detection

Your library includes a built-in anomaly detector:

* detects unusual cycle jumps
* adjusts confidence
* returns human notes like:
  *"Your cycles vary more than usual."*

---

# 📄 License

MIT License.

---

# ❤️ Credits

Built by **Narendra (nkrider)**
For real apps, real people, real health.
