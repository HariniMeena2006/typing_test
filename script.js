// Element references
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let restartBtn = document.getElementById("restartBtn");
let inputField = document.getElementById("inputField");
let timerElement = document.getElementById("timer");
let wpmElement = document.getElementById("wpm");
let accuracyElement = document.getElementById("accuracy");
let messagePopup = document.getElementById("messagePopup");
let levelBox = document.getElementById("levelBox");
let textDisplay = document.getElementById("textDisplay");
let buttonsContainer = document.querySelector(".buttons");
let backToLevel1Btn = document.getElementById("backToLevel1Btn");

// Level configurations
let wordCounts = [50, 150, 200];
let accuracyThresholds = [80, 70, 60];
let currentLevel = 0;
let timer;
let timeLeft = 60;
let wordsTyped = 0;
let correctChars = 0;
let totalTypedChars = 0;

// Sample texts for each level
const textSamples = [
  "The quick brown fox jumps over the lazy dog. Typing quickly and accurately is essential. Practice makes perfect. Keep improving. Never stop learning. Speed is important. Accuracy is key. Typing tests are fun. Test your skills. Typing helps you work faster. Start typing now. Challenge yourself. Keep your eyes on the screen. Focus on your accuracy. Keep practicing and improve your speed. Typing exercises are useful for improving your skills. Make typing a habit. Stay consistent.",
  "Typing is an essential skill in today’s fast-paced digital world. Whether you are a student, professional, or casual computer user, typing quickly and accurately can save time and improve productivity. Developing this skill requires consistent practice, focus, and the right techniques. Beginners should start by learning proper hand placement on the keyboard and using all fingers instead of just a few. As you grow more confident, speed and accuracy will naturally improve. There are many free online tools and games that make learning to type fun and engaging. Typing tests help measure progress and reveal areas for improvement. It’s important not to focus only on speed—accuracy is just as critical. Mistakes can slow you down and reduce the effectiveness of your work. With patience and persistence, anyone can become a fast, efficient typist. Make typing practice part of your daily routine to see steady improvement over time and build confidence.",
  "The human experience is shaped by countless elements—memories, emotions, interactions, and aspirations—all woven together by time. Time is both a friend and a challenge, constantly moving forward, never pausing, never reversing. It dictates the flow of life, presenting opportunities, creating change, and teaching lessons. While people strive to control time through schedules and routines, it remains an untamed force, indifferent to human desires. Throughout history, civilizations have sought ways to measure time, from ancient sundials to modern atomic clocks, refining their understanding of its passage. In literature and philosophy, time is a frequent theme, explored as both an abstract and tangible presence. Some view time as cyclical, repeating patterns throughout existence, while others see it as linear, an unyielding march toward the future. Regardless of perspective, time influences decisions, relationships, and personal growth. It holds moments of joy and sorrow, preserving memories while simultaneously urging progress. People reminisce about the past, dream of the future, and strive to make the present meaningful. Ultimately, time is life’s ever-present companion, a reminder to cherish each moment, embrace change, and pursue purpose. Whether fast or slow, fleeting or profound, time remains one of life’s greatest mysteries and most powerful forces. Typing tests help measure progress and reveal areas for improvement. It’s important not to focus only on speed—accuracy is just as critical. Mistakes can slow you down and reduce the effectiveness of your work. With patience and persistence, anyone can become a fast, efficient typist. Make typing practice part of your daily routine to see steady improvement over time and build confidence."
];

// Event listeners
startBtn.addEventListener("click", startTest);
stopBtn.addEventListener("click", stopTest);
restartBtn.addEventListener("click", restartLevel);
backToLevel1Btn.addEventListener("click", goBackToLevel1);

function startTest() {
    clearInterval(timer);  // Clear any existing timer
  
    let time;
    if (currentLevel === 0) {
      time = 60;
    } else if (currentLevel === 1) {
      time = 90;
    } else {
      time = 150;
    }
  
    resetStats(time);  // ✅ Pass the correct time here
  
    displayText();
    inputField.disabled = false;
    inputField.value = "";
    inputField.focus();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    restartBtn.style.display = currentLevel === 0 ? "inline-block" : "none";
    backToLevel1Btn.style.display = "none";
    timer = setInterval(updateTimer, 1000);
  }
  
  
  
function stopTest() {
    clearInterval(timer);
    inputField.disabled = true;
    stopBtn.disabled = true;
    startBtn.disabled = false;

    const typed = inputField.value.trim();
    const target = textSamples[currentLevel].trim();

    totalTypedChars = typed.length;
    correctChars = 0;

    // Calculate correct characters
    for (let i = 0; i < Math.min(typed.length, target.length); i++) {
        if (typed[i] === target[i]) {
            correctChars++;
        }
    }

    // Word count
    wordsTyped = typed.split(/\s+/).filter(w => w.length > 0).length;

    // Character-based accuracy based on target text length
    let accuracy = target.length > 0 ? (correctChars / target.length) * 100 : 0;

    let timeTaken = (60 - timeLeft) / 60;
    let wpm = timeTaken > 0 ? (wordsTyped / 5) / timeTaken : 0;

    accuracyElement.innerText = accuracy.toFixed(2);
    wpmElement.innerText = wpm.toFixed(2);

    // Round accuracy for reliable comparison
    const roundedAccuracy = Math.round(accuracy * 100) / 100;
    const passed = roundedAccuracy >= accuracyThresholds[currentLevel] && wordsTyped >= wordCounts[currentLevel];

    if (passed) {
        if (currentLevel === 0) {
            showMessage("✅ Great! You've completed Level 1!", "success");
            showNextButton();
            return;
        } else if (currentLevel === 1) {
            showMessage("✅ Well done! You've completed Level 2!", "success");
            showNextButton();
            return;
        } else if (currentLevel === 2) {
            showMessage("🎉 You have great typing skills! Completed all levels!", "success");
            backToLevel1Btn.style.display = "inline-block";
            return;
        }
    } else {
        if (currentLevel === 0) {
            showMessage("❌ Good try! Keep practicing and try again.", "error");
        } else {
            showMessage("❌ Failed! Click 'Back to Level 1' to restart.", "error");
            backToLevel1Btn.style.display = "inline-block";
        }
    }
}
function updateTimer() {
  timeLeft--;
  timerElement.innerText = timeLeft;
  if (timeLeft <= 0) {
    stopTest();
  }
}

function displayText() {
  levelBox.innerText = `Level ${currentLevel + 1}: ${wordCounts[currentLevel]} words`;
  textDisplay.innerText = textSamples[currentLevel];
}

function showMessage(message, type) {
  messagePopup.classList.remove("popup-error", "popup-success");
  messagePopup.classList.add(type === "error" ? "popup-error" : "popup-success");
  messagePopup.innerText = message;
  messagePopup.style.display = "block";
  setTimeout(() => {
    messagePopup.style.display = "none";
  }, 1000);
}

function showNextButton() {
    if (document.querySelector(".next-level-btn")) return;
  
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next Level";
    nextBtn.className = "next-level-btn";
  
    nextBtn.addEventListener("click", () => {
      // Move to next level
      currentLevel++;
  
      // Determine time for new level
      let time;
      if (currentLevel === 0) {
        time = 60;
      } else if (currentLevel === 1) {
        time = 90;
      } else {
        time = 150;
      }
  
      // Reset all UI + data
      displayText();
      resetStats(time); // ✅ Reset time, accuracy, wpm
  
      inputField.value = "";
      inputField.disabled = true;
      startBtn.disabled = false;
      stopBtn.disabled = true;
  
      // Remove the next level button
      nextBtn.remove();
    });
  
    buttonsContainer.appendChild(nextBtn);
  }
  
function goBackToLevel1() {
    currentLevel = 0;
    displayText();
    resetStats();
    inputField.value = "";
    inputField.disabled = true;
    stopBtn.disabled = true;
    startBtn.disabled = false;

    const existingNextBtn = document.querySelector(".next-level-btn");
    if (existingNextBtn) {
        existingNextBtn.remove();
    }

    backToLevel1Btn.style.display = "none";
    restartBtn.style.display = "inline-block";
}


function restartLevel() {
    clearInterval(timer);

    let time;
    if (currentLevel === 0) {
        time = 60;  // 60 seconds for level 1
    } else if (currentLevel === 1) {
        time = 90;  // 90 seconds for level 2
    } else {
        time = 150; // 150 seconds for level 3
    }

    resetStats(time);  // Pass the appropriate time for the level
    displayText();
    inputField.value = "";
    inputField.disabled = true;
    stopBtn.disabled = true;
    startBtn.disabled = false;

    const existingNextBtn = document.querySelector(".next-level-btn");
    if (existingNextBtn) {
        existingNextBtn.remove();
    }
}



function resetStats(time) {
    timeLeft = time;  // Set timeLeft dynamically
    timerElement.innerText = timeLeft;  // Update the timer display
    wpmElement.innerText = "0.00";
    accuracyElement.innerText = "0.00";
    wordsTyped = 0;
    correctChars = 0;
    totalTypedChars = 0;
  }
  