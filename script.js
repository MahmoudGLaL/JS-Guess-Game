const Keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const hangmanImg = document.querySelector(".hangman-box img");
const wrongGuess = document.querySelector(".guess-text b");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again");


let currentWord , wrongGuessCount = 0 , correctLetter = [] ;
const maxGuessCount = 6 ;

const resetGame = () => {
    correctLetter = [];
    wrongGuessCount = 0 ;
    wrongGuess.innerText = `${wrongGuessCount} / ${maxGuessCount}`;
    hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
    Keyboard.querySelectorAll("button").forEach(btn=> btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
}

const getRandomWord = () => {
    const {word , hint } = wordList[Math.floor(Math.random() * wordList.length)]; 
    console.log(word);
    currentWord = word;
     document.querySelector(".hint-text b").innerText = hint;
     resetGame();
     
}

const gameOver = (isVictory) => {
    const modelText = isVictory ? `you found the word` : `the correct word was` ;
    // gameStatus.innerText = "Correct , You Won" ;
    gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModel.querySelector("h4").innerText = `${isVictory ? 'Congratulations' : 'GameOver'}`;
    gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord} </b>`;
    setTimeout(() => {
        gameModel.classList.add("show");
    },200)
}

const initGame = (button , clickedLetter) => { 
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter , index) => {
            if (letter === clickedLetter){
                correctLetter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter ;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else {
       wrongGuessCount++;
    }
    button.disabled = true;
    wrongGuess.innerText = `${wrongGuessCount} / ${maxGuessCount}`;
    hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;

    if(wrongGuessCount === maxGuessCount) return gameOver(false);
    if(correctLetter.length === currentWord.length) return gameOver(true);
}
for(i= 97 ; i <= 122 ; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    Keyboard.appendChild(button);
    button.addEventListener("click", e => initGame(e.target , e.target.innerText. toLowerCase()));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);