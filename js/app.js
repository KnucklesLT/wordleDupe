import {allWords} from './wordList.js'
/*-------------------------------- Constants --------------------------------*/
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const motivational =['You can do it!','Great guess!','I believe in you!','Keep going!','Weird guess, but I love it!', "Brilliant!", "You awe me!", 'Stupendous guess!',
                      'Fantastic!', 'Incredible', "You're majestic!"]
/*-------------------------------- Variables --------------------------------*/
let guessWord, wordToGuess, rows, letterColumn, guessArr, attempts



/*------------------------ Cached Element References ------------------------*/

// const lightDarkBtn = document.querySelector("#light-dark-mode")
const guessRows = document. querySelectorAll("div#guess-row-container")
const keyboard = document.querySelectorAll("#keyboard-rows > button")
const resetBtn = document.querySelector("#resetButton")
const boardMessage = document.getElementById('message')
const lossSound = new Audio("../audio/womp-womp.mp3")
const winSound = new Audio("../audio/cheer.mp3")
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
    key.disabled = false
    if (key.id !== 'delete' && key.id !== 'enter'){
      key.className = 'btn btn-secondary'
    }
  })

  document.querySelector('h1').textContent = "Luigi's Wordle"
  boardMessage.textContent = "Let's get started!"
  boardMessage.className = ''
  wordToGuess = getWordToGuess()
  attempts = 1
  rows=0
  letterColumn=0
  guessArr = []
  console.log(wordToGuess)
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

      proceed()
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

        proceed()
      } 
    } 
  }
}


function isLetter(letter){
  if(alphabet.includes(letter.toLowerCase())){
    return true
  } 
  
}


function proceed(){
  compareWords()
  rows++
  attempts++
  letterColumn = 0
  guessArr = []
}


function renderLetters(letter){
  guessRows[rows].children[letterColumn].textContent = letter.toUpperCase()
}


function deleteLetter(){
  if(letterColumn > 0){
  guessArr.pop()
  letterColumn--
  guessRows[rows].children[letterColumn].textContent = ''
  }
}


function compareWords(){
  let lettersInWord = wordToGuess

  for (let i = 0; i< wordToGuess.length; i++){
    if(wordToGuess[i] === guessWord[i]){
      lettersInWord = lettersInWord.replace(guessWord[i],'')
      guessRows[rows].children[i].classList= `animate__animated animate__flipInX animate__delay-${i}s`
      guessRows[rows].children[i].style.backgroundColor = 'green'
      
      document.querySelector(`#${guessWord[i]}`).classList= ''
      document.querySelector(`#${guessWord[i]}`).classList.add('btn','btn-success')
      
    } else {
      if(!document.querySelector(`#${guessWord[i]}`).className.includes('btn-success')){
        document.querySelector(`#${guessWord[i]}`).classList = ''
        document.querySelector(`#${guessWord[i]}`).classList.add('btn','btn-dark')
      }
      guessRows[rows].children[i].classList= `animate__animated animate__flipInX animate__delay-${i}s`
    }

  }
  for (let i = 0; i< wordToGuess.length; i++){
    if (lettersInWord.includes(guessWord[i]) && wordToGuess[i] !== guessWord[i]){
      if(!document.querySelector(`#${guessWord[i]}`).className.includes('btn-success')){ 
        document.querySelector(`#${guessWord[i]}`).classList = ''
        document.querySelector(`#${guessWord[i]}`).classList.add('btn','btn-warning')
      }
      lettersInWord = lettersInWord.replace(guessWord[i],'')
      guessRows[rows].children[i].style.backgroundColor = '#FFD300'
      guessRows[rows].children[i].classList= `animate__animated animate__flipInX animate__delay-${i}s`
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
    winSound.volume = .10
    winSound.play()

    disableKeyboard()
    

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

    document.removeEventListener('keydown', handleTyping)
    disableKeyboard()

    lossSound.volume =.10
    lossSound.play()
  }
}

function disableKeyboard (){
  keyboard.forEach((key)=>{
    key.disabled = true      
  })
}

function getWordToGuess() {
  return allWords[Math.floor(Math.random() * allWords.length - 1)]
}


function realWord(word) {
  if (allWords.includes(word.toLowerCase())){
    if (attempts!==4 || attempts !== 6) boardMessage.textContent = motivational[Math.floor(Math.random() * motivational.length - 1)]
    boardMessage.className=''
    return true
  } else {
    boardMessage.textContent = 'Not a real word!'
    boardMessage.className = 'animate__animated animate__shakeX'
  }
}
