const correctWord = "ETHAN";
let attempts = 0;
const maxAttempts = 6;

const grid = document.getElementById("grid");
const guessInput = document.getElementById("guessInput");
const submitGuessButton = document.getElementById("submitGuess");
const resultMessage = document.getElementById("resultMessage");

// Initialize the grid with empty divs
for (let i = 0; i < maxAttempts * 5; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
}

submitGuessButton.addEventListener("click", () => {
    const guess = guessInput.value.toUpperCase();

    if (guess.length !== 5) {
        alert("Please enter a 5-letter word.");
        return;
    }

    attempts++;
    displayGuess(guess);

    if (guess === correctWord) {
        resultMessage.textContent = "Congratulations! You guessed the word!";
        resultMessage.style.color = "green";
    } else if (attempts === maxAttempts) {
        resultMessage.textContent = `Game Over! The correct word was "${correctWord}".`;
        resultMessage.style.color = "red";
    } else {
        resultMessage.textContent = `Attempt ${attempts} of ${maxAttempts}. Keep going!`;
        resultMessage.style.color = "black";
    }

    guessInput.value = "";
    guessInput.focus();
});

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
        return "green"; // Correct letter and position
    } else if (correctWord.includes(letter)) {
        return "yellow"; // Correct letter but wrong position
    } else {
        return "gray"; // Incorrect letter
    }
}
