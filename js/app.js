import {allWords} from './wordList.js'
/*-------------------------------- Constants --------------------------------*/
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

/*-------------------------------- Variables --------------------------------*/
let guessWord, wordToGuess, rows, letterColumn, guessArr, attempts



/*------------------------ Cached Element References ------------------------*/

const lightDarkBtn = document.querySelector("#light-dark-mode")
const guessRows = document. querySelectorAll("div#guess-row-container")
const keyboard = document.querySelectorAll("#keyboard-rows > button")
const resetBtn = document.querySelector("#resetButton")
const boardMessage = document.getElementById('message')
/*----------------------------- Event Listeners -----------------------------*/


// lightDarkBtn.addEventListener('click', toggleLightDark)
resetBtn.addEventListener('click',init)

keyboard.forEach((keys) => {
  keys.addEventListener('click', handleClick)
})


document.addEventListener('keydown', handleTyping)
/*-------------------------------- Functions --------------------------------*/
console.log(keyboard);
init()

function init() {
  guessRows.forEach((row)=> {
    for (let i =0; i<5; i++){
      row.children[i].textContent = ''
      row.children[i].style.backgroundColor = 'black'
    }
  })

  keyboard.forEach((key)=>{
    key.className = 'btn btn-secondary'
  })

  wordToGuess = getWordToGuess()
  attempts = 0
  rows=0
  letterColumn=0
  guessArr = []
  console.log(wordToGuess);
}


function handleClick(evt){
  if(evt.target.id === 'delete') deleteLetter()

  if(isLetter(evt.target.id)){
    if (guessArr.length < 5) {
      guessArr.push(evt.target.id)
      renderLetters(evt.target.id)
      letterColumn++
    }
  }
  if(guessArr.length === 5){
    guessWord = guessArr.join('')
    if(realWord(guessWord)) {
      compareWords()
      rows++
      attempts++
    }
  } 
}

function handleTyping(evt){
  if(evt.key === 'Backspace' && guessArr.length > 0) deleteLetter()
  
  if(isLetter(evt.key)){
    if (guessArr.length < 5) {
      guessArr.push(evt.key.toLowerCase())
      renderLetters(evt.key)
      letterColumn++
    }
    if(guessArr.length === 5){
      guessWord = guessArr.join('')
      if(realWord(guessWord)) {
        compareWords()
        rows++
        attempts++
      }
    } 
  }
}

function isLetter(letter){
  if(alphabet.includes(letter.toLowerCase())){
    return true
  } else {
    // boardMessage.textContent = "Please enter letters"
    boardMessage.classList.add('animate__animated', 'animate__shakeX')
  }
  
}

function renderLetters(letter){
  guessRows[rows].children[letterColumn].textContent = letter.toUpperCase()
}

function deleteLetter(){
  guessArr.pop()
  letterColumn--
  guessRows[rows].children[letterColumn].textContent = ''
}


function getWordToGuess() {
  return allWords[Math.floor(Math.random() * allWords.length - 1)]
}

function realWord(word) {
  return allWords.includes(word.toLowerCase())
}


function compareWords(){
  for (let i = 0; i< wordToGuess.length; i++){
    if(wordToGuess[i] === guessWord[i]){
      guessRows[rows].children[i].style.backgroundColor = 'green'
      
      document.querySelector(`#${wordToGuess[i]}`).classList.remove('btn-secondary')
      document.querySelector(`#${wordToGuess[i]}`).classList.add('btn-success')

    } else if (wordToGuess.includes(guessWord[i])){
      guessRows[rows].children[i].style.backgroundColor = '#FFD300'
    }
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