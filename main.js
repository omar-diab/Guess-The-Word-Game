// Setting Game Area
let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;

// Manage Words
let wordToGuess = "";
const words = ["Neymar" , "Modric" , "Mbappe" , "Buffon" , "Suarez" , "Toyota" , "Google" , "Brazil" , "Norway" , "Greece"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

function generateInputs() {
    const inputsContainer = document.querySelector(".inputs"); 
    // Create Main Try Div
    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`
        if(i !== 1) tryDiv.classList.add("disabled-inputs");
        // Create Inputs
        for (let j = 1; j <= numbersOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength" , "1");
            tryDiv.appendChild(input);
        }
        inputsContainer.appendChild(tryDiv);
    }
    // Do Foucs On The First Element
    inputsContainer.children[0].children[1].focus();
    // Diasble All Inputs Except First One
    const inputInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputInDisabledDiv.forEach((input) => (input.disabled = true));
    // Convert Input Value To UpperCase
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input , index) => {
        input.addEventListener("input" , function() {
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if(nextInput) nextInput.focus();
        });

        input.addEventListener("keydown" , function(event) {
            const currentIndex = Array.from(inputs).indexOf(this);
            if(event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            }
            if(event.key === "ArrowLeft") {
                const prevIndex = currentIndex - 1;
                if(prevIndex >= 0) inputs[prevIndex].focus();
            }
        })
    })
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuess);
function handleGuess() {
    let successGuess = true;
    for (let i = 1; i <= numbersOfLetters; i++) {
        console.log(`#guess-${currentTry}-letter-${i}`)
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];
        // Game Logic
        if (letter === actualLetter) {
            inputField.classList.add("yes-in-place");
        } else if (wordToGuess.includes(letter) && letter !== "") {
            inputField.classList.add("not-in-place");
            successGuess = false;
        } else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    // Check If User Win Or Lose
    if(successGuess === true) {
        goodGame();
        // Play Success Sound
        document.getElementById("success").play();
        let allTries = document.querySelectorAll("inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add(".disabled-inputs"))
    }else {
        document.querySelector(`.try-${currentTry}`).classList.add(".disabled-inputs");
        const currentTryIndex = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryIndex.forEach((input) => (input.disabled = true));
        currentTry++
        const nextTryIndex = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryIndex.forEach((input) => (input.disabled = false));
        let el = document.querySelector(`.try-${currentTry}`)
        if(el) {
            document.querySelector(`.try-${currentTry}`).classList.remove(".disabled-inputs");
            el.children[1].focus();
        }else {
            guessButton.disabled = true;
            gameOver();
            // Play Fail Sound
            document.getElementById("fail").play();
        }
    }
}

function handleBackspace(event) {
    if(event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if(currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.focus();
        }
    }
}
document.addEventListener("keydown", handleBackspace);

window,onload = function() {
    generateInputs();
}




// Game Over Function
function gameOver(){
    // Create Game Over Popup Div
    let div = document.createElement("div");
    // Create Text
    let divText = document.createTextNode(`Game Over, Try Again`);
    // Append Text To The Div
    div.appendChild(divText);
    // Add Class To The Div
    div.className = "game-over";
    // Create The Next Button
    let p = document.createElement("p");
    // Create Text
    let pText = document.createTextNode(`Again`);
    // Append Text To The Div
    p.appendChild(pText);
    // Add Class To The Div
    p.className = "again";
    // Append The Div To The Body
    document.body.appendChild(div);
    document.body.appendChild(p);
}

// Good Game Function
function goodGame(){
    // Create Good Game Popup Div
    let div = document.createElement("div");
    // Create Text
    let divText = document.createTextNode(`Good Game`);
    // Append Text To The Div
    div.appendChild(divText);
    // Add Class To The Div
    div.className = "good-game";
    // Create The Next Button
    let p = document.createElement("p");
    // Create Text
    let pText = document.createTextNode(`Next`);
    // Append Text To The Div
    p.appendChild(pText);
    // Add Class To The Div
    p.className = "next";
    // Append The Div & P To The Body
    document.body.appendChild(div);
    document.body.appendChild(p);
}

//  Next Level Step
document.addEventListener("click", (n) => {
    if (n.target.className.includes("again")) {
        location.reload();
    }
});
document.addEventListener("click", (n) => {
    if (n.target.className.includes("next")) {
        location.reload();
    }
});