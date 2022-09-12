import {allWords,randomWord, realWord} from './wordList.js'
/*-------------------------------- Constants --------------------------------*/

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

/*-------------------------------- Variables --------------------------------*/



/*------------------------ Cached Element References ------------------------*/


const lightDarkBtn = document.querySelector("#light-dark-mode")

const keyboard = document.querySelector("#key-board-container")
const resetBtn = document.querySelector("#resetBtn")
/*----------------------------- Event Listeners -----------------------------*/


// lightDarkBtn.addEventListener('click', toggleLightDark)

keyboard.addEventListener('click', handleClick)

/*-------------------------------- Functions --------------------------------*/

// console.log(typeof wordList);

function handleClick(evt){
  console.log(evt.target.id);
}


console.log(allWords[Math.floor(Math.random()* allWords.length - 1)]);






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

// // checkDarkPref()