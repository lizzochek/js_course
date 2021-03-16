"use strict";

//Coding challenge 1

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    draw: 3.25,
    team2: 6.5,
  },
};

const players1 = [...game.players[0]];
const players2 = [...game.players[1]];

const gk1 = players1.slice(0, 1);
const fieldPlayers1 = players1.slice(1);

const allPlayers = [...players1, ...players2];

const playersFinal = [...players1, "Thiago", "Coutinho", "Perisic"];
const { team1, draw, team2 } = game.odds;

function printGoals(...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
}
printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals("Davies", "Muller");
printGoals(...game.scored);

//console.log(team1 < team2 ? "Team 1" : "Team 2");

/*
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
*/

//Coding challenge 2

for (let [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

const oddsCount = Object.values(game.odds);
console.log(oddsCount);
let sum = 0;
let average;

for (const value of oddsCount) {
  sum += value;
}

average = sum / oddsCount.length;
console.log(`Average odd: ${average}`);

console.log(`Odd of victory Bayern Munich: ${game.odds.team1}`);
console.log(`Odd of draw: ${game.odds.draw}`);
console.log(`Odd of victory Borrussia Dortmund: ${game.odds.team2}`);

function getScoredObj() {
  let obj = {};
  let arr = game.scored;
  for (let i = 0; i < arr.length; i++) {
    if (obj.hasOwnProperty(arr[i])) {
      obj[arr[i]]++;
    } else {
      obj[arr[i]] = 1;
    }
  }
  //scorers[player] ? scorers[player]++ : (scorers[player] = 1);
  return console.log(obj);
}
getScoredObj();

//Coding challenge 3

const gameEvents = new Map([
  [17, "GOAL"],
  [36, "Substitution"],
  [47, "GOAL"],
  [61, "Substitution"],
  [64, "Yellow card"],
  [69, "Red card"],
  [70, "Substitution"],
  [72, "Substitution"],
  [76, "GOAL"],
  [80, "GOAL"],
  [92, "Yellow card"],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);
gameEvents.delete(64);
console.log(gameEvents);

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

for (let [key, value] of gameEvents) {
  const half = key <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half} HALF] ${key}: ${value}`);
}

//Coding challenge 4
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split("_");
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${"✅".repeat(i + 1)}`);
  }
});
