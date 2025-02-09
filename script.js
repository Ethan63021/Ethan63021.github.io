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
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[startIdx + i];
        cell.textContent = guess[i];
        cell.style.backgroundColor = "#bdc3c7"; // Light gray for incorrect letters
    }
}
