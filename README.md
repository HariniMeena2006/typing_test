# typing_test
# ⌨️ Typing Speed Test Web App
![image](https://github.com/user-attachments/assets/43ffba4a-11d3-4d8a-9a11-d01320e41e0f)

A **level-based typing speed test** web application designed to improve your typing skills. Built entirely with **frontend technologies** (HTML, CSS, JavaScript or React), this app dynamically tracks your speed and accuracy while progressively increasing difficulty through levels.
![image](https://github.com/user-attachments/assets/24a1228d-021c-44fa-a1b4-d01490518e90)

---

## 🖼️ Overview

This app provides a clean, intuitive interface for users to test their typing speed and accuracy. It features **three levels**, each with different challenges, increasing word count, and accuracy requirements. The UI updates live as users type, offering instant feedback and results.

---

## 🧠 Core Concepts

### 🎮 Level System

- **Level 1 (Beginner):**
  - Short sentences
  - Minimum WPM: 20
  - Minimum Accuracy: 85%

- **Level 2 (Intermediate):**
  - Medium paragraph
  - Minimum WPM: 35
  - Minimum Accuracy: 90%

- **Level 3 (Advanced):**
  - Long paragraph with complex vocabulary
  - Minimum WPM: 50
  - Minimum Accuracy: 95%

Each level unlocks only when the user completes the previous one with the required performance.

---

## 🎨 UI/UX Design

The design follows **minimal, clean, and responsive** principles:

### 🧱 Layout

- **Centered typing box** with real-time feedback
- **Progress bar or level indicator** at the top
- **Performance stats panel** below the typing area (WPM, accuracy, time)
- **Next/Retry buttons** shown after each level is completed

### 🎨 Color Scheme

- Calm, neutral background (light gray, white)
- Highlight colors for:
  - Correct letters (green)
  - Incorrect letters (red)
  - Current letter (blue or underline)
- Consistent theme across light and dark mode (optional)

### 💡 Typography

- Monospace font for typing text (like `Courier New`, `Fira Code`)
- Clean sans-serif for headings and buttons (`Inter`, `Roboto`, etc.)

### 📱 Responsiveness

- Mobile-first design
- Resizes well for phones, tablets, and desktops
- Flexible containers using media queries or Tailwind’s responsive utilities

---

## ⚙️ How It Works

- App loads random paragraphs per level from a pre-defined text array or JSON.
- JavaScript tracks keystrokes and compares them to the reference text:
  - Correct keys: green
  - Incorrect keys: red
  - Real-time character matching
- Timer starts on first keystroke
- WPM and Accuracy are calculated live:
  - `WPM = (correct words / time in minutes)`
  - `Accuracy = (correct characters / total typed characters) * 100`
- On level completion:
  - Performance stats are shown
  - Next level button appears if performance meets required threshold
  - Retry option appears if not

---
## 🛠️ Technologies Used

| Area        | Technology           |
|-------------|----------------------|
| Structure   | HTML                 |
| Styling     | CSS                  |
| Interactivity | JavaScript         |
| Deployment | GitHub Pages / Vercel |

---





