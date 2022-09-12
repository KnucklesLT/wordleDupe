import {allWords} from './wordList.js'
/*-------------------------------- Constants --------------------------------*/
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

/*-------------------------------- Variables --------------------------------*/
let guessArr = []
let guessWord, wordToGuess, rows, letters



/*------------------------ Cached Element References ------------------------*/

const lightDarkBtn = document.querySelector("#light-dark-mode")
const guessRows = document. querySelectorAll("div#guess-row-container")
const keyboard = document.querySelector("#key-board-container")
const resetBtn = document.querySelector("#resetButton")
/*----------------------------- Event Listeners -----------------------------*/


// lightDarkBtn.addEventListener('click', toggleLightDark)
resetBtn.addEventListener('click',init)

keyboard.addEventListener('click', handleClick)

document.addEventListener('keydown', (evt)=>{
  if (guessArr.length < 5) {
    guessArr.push(evt.key.toLowerCase())
    console.log(evt.key);
  }
  if(guessArr.length === 5){
    guessWord = guessArr.join('')
    console.log(guessWord);
  } 
})
/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  guessRows.forEach((row,idx)=> {
    for (let i =0; i<5; i++){
      row.children[i].textContent = ''
    }
  })
  wordToGuess = randomWord()
  rows=0
  letters=0
  console.log(wordToGuess);
}


function handleClick(evt){
  console.log(evt.target.id)
}


function randomWord() {
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