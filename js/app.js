import {allWords} from './wordList.js'
/*-------------------------------- Constants --------------------------------*/
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

/*-------------------------------- Variables --------------------------------*/
let guessWord, wordToGuess, rows, numLetters, guessArr



/*------------------------ Cached Element References ------------------------*/

const lightDarkBtn = document.querySelector("#light-dark-mode")
const guessRows = document. querySelectorAll("div#guess-row-container")
const keyboard = document.querySelector("#key-board-container")
const resetBtn = document.querySelector("#resetButton")
const boardMessage = document.getElementById('message')
/*----------------------------- Event Listeners -----------------------------*/


// lightDarkBtn.addEventListener('click', toggleLightDark)
resetBtn.addEventListener('click',init)

keyboard.addEventListener('click', handleClick)

document.addEventListener('keydown', handleTyping)
/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  guessRows.forEach((row)=> {
    for (let i =0; i<5; i++){
      row.children[i].textContent = ''
    }
  })
  wordToGuess = getWordToGuess()
  rows=0
  numLetters=0
  guessArr = []
  console.log(wordToGuess);
}


function handleClick(evt){
  if((evt.target.id !== 'enter' || evt.target.id !== 'delete') && isLetter(evt.target.id))
  console.log(evt.target.id)

}

function handleTyping(evt){
  if(isLetter(evt.key)){

    if (guessArr.length < 5) {
      guessArr.push(evt.key.toLowerCase())
      console.log(evt.key);
    }
    if(guessArr.length === 5){
      guessWord = guessArr.join('')
      console.log(guessWord);
    } 
  }
}

function isLetter(letter){
  if(alphabet.includes(letter.toLowerCase())){
    return true
  } else {
    boardMessage.textContent = "Please enter letters"
    boardMessage.classList.add('animate__animated', 'animate__shakeX')
  }
  
}






function getWordToGuess() {
  return allWords[Math.floor(Math.random() * allWords.length - 1)]
}

function realWord(word) {
  if(allWords.includes(word)){
      return true
  } 
}





// function toggleLightDark() {
//   confetti.start(2000)
//   body.className = body.className === "dark" ? "" : "dark"
// }

// function checkDarkPref() {
//   if(
//     window.matchMedia("(prefers-color-scheme:dark)").matches &&
//     body.className !== "dark"
//   ) {
//     toggleLightDark()
//   }
// }

// checkDarkPref()