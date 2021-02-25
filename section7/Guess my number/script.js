"use strict";

let secretNumber = Math.round(Math.random() * 20);
let score = 20;
let highscore = 0;

function setMessage(message) {
  document.querySelector(".message").textContent = message;
}

function defineScore(score) {
  document.querySelector(".score").textContent = score;
}

document.querySelector(".check").addEventListener("click", () => {
  const guess = parseInt(document.querySelector(".guess").value);
  if (score > 1) {
    //No input
    if (!guess) {
      setMessage("No number!");

      //When a player wins
    } else if (guess === secretNumber) {
      setMessage("Correct Number!");
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";
      document.querySelector(".number").textContent = secretNumber;

      if (score > highscore) {
        highscore = score;
        document.querySelector(".highscore").textContent = score;
      }

      //Incorrect guesses
    } else if (guess !== secretNumber) {
      setMessage(guess > secretNumber ? "Too high..." : "Too low...");
      score--;
      defineScore(score);
    } else {
      setMessage("You lost the game");
      defineScore(0);
    }
  }
});

document.querySelector(".again").addEventListener("click", () => {
  score = 20;
  secretNumber = Math.round(Math.random() * 20);
  defineScore(score);
  setMessage("Start guessing...");
  setMessage("?");
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
