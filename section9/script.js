"use strict";

//Destructuring
const weekday = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
  [weekday[3]]: {
    open: 12,
    close: 22,
  },
  [weekday[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0,
    close: 24,
  },
};

const restaurant = {
  restName: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  numGuests: undefined,
  openingHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, mainIndex = 1, time = "20:00", address }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1},${ing2}, ${ing3}`);
  },
};

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

//Basic destructuring
const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//Switching values
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

[secondary, main] = [main, secondary];
console.log(main, secondary);

//Destructuring the function results
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, j, [k, e]] = nested;
console.log(i, j, k, e);

//Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

//Destructuring objects
const { restName, categories, openingHours1 } = restaurant;
console.log(restName, categories, openingHours);

const {
  restName: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//Defaults
const { menu = [], starterMenu: starterM = [] } = restaurant;

//Changing variables
let a1 = 111;
let b1 = 222;
const obj = { a1: 23, b1: 7, c: 14 };

({ a1, b1 } = obj);
console.log(a1, b1);

//Nested destructuring
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

restaurant.orderDelivery({
  time: "22,30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: "Via del Sole, 21",
  starterIndex: 1,
});

const arr1 = [7, 8, 9];
const arr2 = [1, 2, ...arr1];
console.log(arr2);
console.log(...arr2);

const newMenu = [...restaurant.mainMenu, "Gnocchi"];
console.log(newMenu);

//Copy array
const mainMenuCopy = [...restaurant.mainMenu];

//Join arrays
const joined = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(joined);

const str = "Liza";
const letters = [...str, " ", "D"];
console.log(letters);

const ingredients = ["tomatoes", "pepper", "cheese"];
restaurant.orderPasta(...ingredients);

//Objects
const newRestaurant = { ...restaurant, founder: "Guiseppe", foundIn: 1998 };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.restName = "Ristorante Roma";
console.log(restaurantCopy.restName);
console.log(restaurant.restName);

//Short-circuiting
console.log(3 || "Jonas");
console.log("" || "Liza");
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || "" || "Hello" || 323 || null);

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log(0 && "Liza");
console.log(7 && "Liza");
console.log("Hello" && 23 && null && "Liza");

if (restaurant.orderPasta) {
  restaurant.orderPasta("mushrooms", "spinach", "cheese");
}

restaurant.orderPasta &&
  restaurant.orderPasta("mushrooms", "spinach", "cheese");

//Оператор нулевого слияния - The Nullish Coalescing Operator
/*
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);
*/

const menu2 = [...restaurant.mainMenu, ...restaurant.starterMenu];

for (let item of menu2) console.log(item);

for (let item of menu2.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

for (let [i, el] of menu2.entries()) {
  console.log(`${i + 1}: ${el}`);
}

//OPtional chaining
/*
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

for (const day of weekday) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day}, we are ${open}`);
}

console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

const users = [{ name: "Liza", email: "littled685@gmail.com" }];
console.log(users[0]?.name ?? "User array empty");
*/

for (const day of Object.keys(openingHours)) {
  console.log(day);
}

const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} day: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

const values = Object.values(openingHours);
console.log(values);

const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//Sets

const orderSets = new Set(["Pasta", "Pizza", "Risotto", "Pizza", "Pasta"]);
console.log(orderSets);

console.log(new Set("Liza"));
console.log(orderSets.has("Pizza"));
console.log(orderSets.has("Bread"));
orderSets.add("Garlic bread");
orderSets.delete("Risotto");

for (const order of orderSets) console.log(order);

const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const unique = [...new Set(staff)];
console.log(unique);

//Maps

const rest = new Map();
rest.set("name", "Classico Italiano");
rest.set(1, "Italy").set(true, "Melicca");
console.log(rest);
console.log(rest.get(1));

console.log(rest.has("categories"));
rest.delete(1);
const arrMap = [1, 2];
rest.set(arrMap, "array");
console.log(rest);
console.log(rest.get(arrMap));

const question = new Map([
  //Same structure as returned from Object.entries()
  ["question", "What is the best programming language?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct"],
  [false, "Try again"],
]);
console.log(question);

const hoursOpen = new Map(Object.entries(openingHours));
console.log(hoursOpen);

for (const [key, value] of question) {
  if (typeof key === " number") console.log(`Answer ${key}: ${value}`);
}
let answer = 5;
let str1 = question.get(answer === question.get("correct"));
console.log(str1);

console.log([...question]);
//entries, keys and values methods can be used

//Strings

const airline = "Ukraine airlines";
const plane = "A320";
console.log(plane[1]);
console.log(plane.length);
console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));

console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));
console.log(airline.slice(-2));
console.log(airline.slice(2, -2));
console.log(airline.replace(/i/g, "B"));
//Works with newer node versions
console.log(airline.replaceAll("i", "B"));

const checkMiddleSit = (seat) => {
  //B or E are middle sits
  const s = seat.slice(-1);
  if (s === "B" || s === "E") console.log("You got a middle sit");
  else console.log("You are lucky");
};
checkMiddleSit("11C");
checkMiddleSit("23E");

//str.includes(), str.startsWith(), str.endsWith()
const checkBaggage = (items) => {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are not aloud on board");
  } else {
    console.log("Welcome");
  }
};

checkBaggage("I have an apple and a Knife");
checkBaggage("I've got a pen and a pencil");
checkBaggage("A gun");

//split, join
function capitalizeName(name) {
  const names = name.split(" ");
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
    //namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(" "));
}

capitalizeName("liza dolgova");

//Prolongs a string with a chosen part (+) to a chosen length (25)
const message = "Go to gate 23";
console.log(message.padStart(25, "+"));

const maskCreditCard = function (number) {
  const str = number.toString();
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

console.log(maskCreditCard(1234123412341234));
console.log(maskCreditCard("1234123412341234"));

const mes = "Hello there... ";
console.log(mes.repeat(5));
