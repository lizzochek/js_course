"use strict";

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
