"use strict";

//Destructuring
const restaurant = {
  restName: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  numGuests: undefined,
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 1,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
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
const { restName, categories, openingHours } = restaurant;
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
  console.log(item);
}
