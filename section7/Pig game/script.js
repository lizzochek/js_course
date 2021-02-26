"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

//Setting the initial conditions
let finalScores, currentScore, activePlayer, playing;

function initialValues() {
  finalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}
initialValues();

//Additional functions
function changeActivePlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer ? 0 : 1;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

function endGame() {
  playing = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
}

//Rolling the dice
btnRoll.addEventListener("click", () => {
  if (playing) {
    //Generating a random dice
    let dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying the dice in the game
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //Actions according to the number on a dice
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      changeActivePlayer();
    }
  }
});

//Holding the score
btnHold.addEventListener("click", () => {
  if (playing) {
    finalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScores[activePlayer];
    if (finalScores[activePlayer] >= 100) {
      endGame();
    } else {
      changeActivePlayer();
    }
  }
});

//New game
btnNew.addEventListener("click", initialValues);
