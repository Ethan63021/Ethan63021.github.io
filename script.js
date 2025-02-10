const correctWord = "ETHAN";
let attempts = 0;
const maxAttempts = 6;
let currentGuess = "";

// Elements
const grid = document.getElementById("grid");
const keystrokeContainer = document.getElementById("keystrokeContainer");
const submitButton = document.getElementById("submitButton");

// Initialize the grid with empty divs
for (let i = 0; i < maxAttempts * 5; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
}

// Initialize keystroke container for visual feedback
for (let i = 0; i < 5; i++) {
    const keystroke = document.createElement("div");
    keystroke.classList.add("keystroke");
    keystrokeContainer.appendChild(keystroke);
}

// Listen for keystrokes on the document
document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
        // Remove the last letter if there is one
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            updateKeystrokes();
        }
    } else if (/^[a-zA-Z]$/.test(e.key)) {
        // Ensure only letters are entered
        if (currentGuess.length < 5) {
            currentGuess += e.key.toUpperCase();
            updateKeystrokes();
        }
    }
});

function submitGuess() {
    if (currentGuess.length === 5) {
        processGuess();
    } else {
        alert("Please enter a full 5-letter word.");
    }
}

// Submit button event listener
submitButton.addEventListener("click", submitGuess);

// Listen for Enter key to submit guess
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitGuess();
    }
});

// Function to process the guess
function processGuess() {
    attempts++;
    displayGuess(currentGuess);

    if (currentGuess === correctWord) {
        alert("Congratulations! You guessed the word!");
    } else if (attempts === maxAttempts) {
        alert(`Game Over! The correct word was "${correctWord}".`);
    }

    currentGuess = ""; // Reset guess after submission
    updateKeystrokes();
}

// Function to update the keystrokes visual display
function updateKeystrokes() {
    const keystrokes = keystrokeContainer.children;
    for (let i = 0; i < 5; i++) {
        keystrokes[i].textContent = currentGuess[i] || "";
    }
}

// Display the guess with colors
function displayGuess(guess) {
    const startIdx = (attempts - 1) * 5;
    const correctWordArray = correctWord.split(""); // Convert "ETHAN" into an array
    const guessArray = guess.split(""); // Convert guess into an array

    // Copy of correctWordArray to track which letters have been used
    let remainingLetters = [...correctWordArray];

    // First pass: Check for correct letters in the correct position (GREEN)
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[startIdx + i];
        cell.textContent = guessArray[i];

        if (guessArray[i] === correctWordArray[i]) {
            cell.style.backgroundColor = "#2ecc71"; // Green (correct position)
            cell.style.color = "white";
            remainingLetters[i] = null; // Mark as used
            guessArray[i] = null; // Mark guessed letter as used
        }
    }

    // Second pass: Check for correct letters in the wrong position (YELLOW)
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[startIdx + i];

        if (guessArray[i] && remainingLetters.includes(guessArray[i])) {
            cell.style.backgroundColor = "#f1c40f"; // Yellow (wrong position)
            cell.style.color = "white";

            // Remove the first occurrence of this letter from remainingLetters
            const letterIndex = remainingLetters.indexOf(guessArray[i]);
            remainingLetters[letterIndex] = null; // Mark as used
        } 
        else if (cell.style.backgroundColor !== "rgb(46, 204, 113)") { 
            // If it's not green already, make it gray
            cell.style.backgroundColor = "#bdc3c7"; // Gray (incorrect letter)
            cell.style.color = "white";
        }
    }
}

