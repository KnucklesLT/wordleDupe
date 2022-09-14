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

/*-------------------------------- Functions --------------------------------*/

init()


function init() {
  document.addEventListener('keydown', handleTyping)
  guessRows.forEach((row)=> {
    for (let i =0; i<5; i++){
      row.children[i].textContent = ''
      row.children[i].style.backgroundColor = 'black'
      row.children[i].classList = ''
    }
  })

  keyboard.forEach((key)=>{
    if (key.id !== 'delete' && key.id !== 'enter'){
      key.className = 'btn btn-secondary'
    }
  })
  document.querySelector('h1').textContent = "Luigi's Wordle"
  boardMessage.textContent = "Let's get started!"
  wordToGuess = getWordToGuess()
  attempts = 1
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
  if(guessArr.length === 5 && evt.target.id === 'enter'){
    guessWord = guessArr.join('')
    if(realWord(guessWord)) {
      compareWords()
      rows++
      attempts++
      letterColumn=0
      guessArr= []
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
        letterColumn = 0
        guessArr = []
      } else {
        boardMessage.classList =''
        guessRows[rows].children.classList = 'animate_animated animate__shakeX'
      }
    } 
  }
}


function isLetter(letter){
  if(alphabet.includes(letter.toLowerCase())){
    return true
  } 
  // else {
  //  boardMessage.textContent = "Please enter letters"
  // }
  
}


function renderLetters(letter){
  guessRows[rows].children[letterColumn].textContent = letter.toUpperCase()
}


function deleteLetter(){
  guessArr.pop()
  letterColumn--
  guessRows[rows].children[letterColumn].textContent = ''
}


function compareWords(){
  
  for (let i = 0; i< wordToGuess.length; i++){
    if(wordToGuess[i] === guessWord[i]){
      guessRows[rows].children[i].classList= `animate__animated animate__flipInX animate__delay-${i}s`
      guessRows[rows].children[i].style.backgroundColor = 'green'
      
      document.querySelector(`#${guessWord[i]}`).classList= ''
      document.querySelector(`#${guessWord[i]}`).classList.add('btn','btn-success')
      
    } else if (wordToGuess.includes(guessWord[i])){
      if(!document.querySelector(`#${guessWord[i]}`).className.includes('btn-success')){ 
        document.querySelector(`#${guessWord[i]}`).classList = ''
        document.querySelector(`#${guessWord[i]}`).classList.add('btn','btn-warning')
      }
      guessRows[rows].children[i].style.backgroundColor = '#FFD300'
      guessRows[rows].children[i].classList= `animate__animated animate__flipInX animate__delay-${i}s`
    } else {
      guessRows[rows].children[i].classList= `animate__animated animate__flipInX animate__delay-${i}s`
      document.querySelector(`#${guessWord[i]}`).classList = ''
      document.querySelector(`#${guessWord[i]}`).classList.add('btn','btn-dark')
    }
  }
  renderWinOrLoss()
}


function renderWinOrLoss(){
  if(attempts===4){
    boardMessage.textContent = 'This is getting close! 😳'
  }
  if (wordToGuess === guessWord){
    confetti.start(2000)
    document.querySelector('h1').textContent = "Congratulations!"
    boardMessage.textContent = attempts === 1 ? 'It took one attempt' : `It took ${attempts} attempts`
    document.removeEventListener('keydown', handleTyping)
    // keyboard.

  } else if (attempts === 6 && wordToGuess !== guessWord){
    document.querySelector('h1').textContent = "Sorry!"
    boardMessage.textContent = `The word was '${wordToGuess}'. Better Luck Next Time!`
    boardMessage.classList.add('animate__animated', 'animate__flipInX')
    guessRows.forEach((row)=> {
      for (let i =0; i<5; i++){
        row.children[i].style.setProperty('--animate-duration', '2s')
        row.children[i].classList = ''
        row.children[i].classList = 'animate__animated animate__flipInY'
        row.children[i].textContent = ''
        row.children[i].style.backgroundColor = 'red'
      }
    })
  }
}


function getWordToGuess() {
  return allWords[Math.floor(Math.random() * allWords.length - 1)]
}


function realWord(word) {
  return allWords.includes(word.toLowerCase())
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