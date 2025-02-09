const correctWord = "ETHAN";
let attempts = 0;
const maxAttempts = 6;
let currentGuess = "";

// Elements
const grid = document.getElementById("grid");
const resultMessage = document.getElementById("resultMessage");

// Initialize the grid with empty divs
for (let i = 0; i < maxAttempts * 5; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
}

// Wordnik API URL and Key (replace with your own API key)
const apiKey = "YOUR_WORDNIK_API_KEY";
const wordnikUrl = "https://api.wordnik.com/v4/word.json";

// Function to check if the word is valid
async function isValidWord(word) {
    try {
        const response = await fetch(`${wordnikUrl}/${word.toLowerCase()}/definitions?api_key=${apiKey}`);
        const data = await response.json();
        
        if (data.length === 0) {
            return false; // No definition found
        }
        
        return true; // Valid word
    } catch (error) {
        console.error("Error checking word:", error);
        return false; // Error occurred, assume invalid
    }
}

// Listen for keystrokes on the document
document.addEventListener("keydown", async (e) => {
    const key = e.key.toUpperCase();

    // Only handle alphabetic keys and ensure it's a letter
    if (key >= 'A' && key <= 'Z') {
        if (currentGuess.length < 5) {
            currentGuess += key;
            updateGrid();
        }

        // If the guess has 5 letters, validate and submit it
        if (currentGuess.length === 5) {
            // Check if the word is valid using the Wordnik API
            const isValid = await isValidWord(currentGuess);
            
            if (!isValid) {
                alert("This is not a valid English word. Please try again.");
                currentGuess = ""; // Reset the guess if invalid
                updateGrid();
                return;
            }

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
            updateGrid(); // Update the grid after the guess
        }
    }
});

// Function to update the grid with the current guess
function updateGrid() {
    const startIdx = (attempts) * 5;

    for (let i = 0; i < 5; i++) {
        const cell = grid.children[startIdx + i];
        const letter = currentGuess[i] || ""; // If no letter, use an empty string

        cell.textContent = letter;
        cell.style.backgroundColor = "#333"; // Default background color
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
