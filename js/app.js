/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/



/*------------------------ Cached Element References ------------------------*/


const lightDarkBtn = document.querySelector("#light-dark-mode")


/*----------------------------- Event Listeners -----------------------------*/


lightDarkBtn.addEventListener('click', toggleLightDark)

/*-------------------------------- Functions --------------------------------*/














function toggleLightDark() {
  confetti.start(2000)
  body.className = body.className === "dark" ? "" : "dark"
}

function checkDarkPref() {
  if(
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== "dark"
  ) {
    toggleLightDark()
  }
}

// checkDarkPref()