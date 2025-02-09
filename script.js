const correctWord = "ETHAN";
let attempts = 0;
const maxAttempts = 6;
let currentGuess = "";

// Elements
const grid = document.getElementById("grid");
const resultMessage = document.getElementById("resultMessage");
const keystrokeContainer = document.getElementById("keystrokeContainer");

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
document.addEventListener("keydown", async (e) => {
    const key = e.key.toUpperCase();

    // Only handle alphabetic keys and ensure it's a letter
    if (key >= 'A' && key <= 'Z') {
        if (currentGuess.length < 5) {
            currentGuess += key;
            updateKeystrokes();
        }

        // If the guess has 5 letters, validate and submit it
        if (currentGuess.length === 5) {
            // Proceed with the guess
            attempts++;
            displayGuess(currentGuess);

            if (currentGuess === correctWord) {
                resultMessage.textContent = "Congratulations! You guessed the word!";
                resultMessage.classList.add("success");
                resultMessage.classList.remove("failure");
            } else if (attempts === maxAttempts) {
                resultMessage.textContent = `Game Over! The correct word was "${correctWord}".`;
                resultMessage.classList.add("failure");
                resultMessage.classList.remove("success");
            } else {
                resultMessage.textContent = `Attempt ${attempts} of ${maxAttempts}. Keep going!`;
                resultMessage.classList.remove("success", "failure");
            }

            currentGuess = ""; // Reset guess after submission
            updateKeystrokes(); // Update keystroke display
        }
    }
});

// Function to update the keystrokes visual display
function updateKeystrokes() {
    const keystrokes = keystrokeContainer.children;

    for (let i = 0; i < 5; i++) {
        const keystroke = keystrokes[i];
        keystroke.textContent = currentGuess[i] || ""; // If no letter, make it empty
    }
}

// Display the guess with colors
function displayGuess(guess) {
    const startIdx = (attempts - 1) * 5;

    for (let i = 0; i < 5; i++) {
        const cell = grid.children[startIdx + i];
        const letter = guess[i];

        cell.textContent = letter;
        cell.style.backgroundColor = getColorForLetter(letter, i);
    }
}

// Get the background color for each letter in the guess
function getColorForLetter(letter, index) {
    if (letter === correctWord[index]) {
        return "#2ecc71"; // Correct letter and position (green)
    } else if (correctWord.includes(letter)) {
        return "#f39c12"; // Correct letter but wrong position (yellow)
    } else {
        return "#7f8c8d"; // Incorrect letter (gray)
    }
}
