"use strict";

const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "liza" },
  { value: -45, description: "Groceries 🥑", user: "liza" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "liza" },
  { value: 300, description: "Freelancing 👩‍💻", user: "liza" },
  { value: -1100, description: "New iPhone 📱", user: "liza" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "liza" },
]);

//Now immutable
const spendingLimits = Object.freeze({
  liza: 1500,
  matilda: 100,
});
//An object will not change
//spendingLimits.jay = 200;

//Objects inside objects can be changed with Object.freeze()
budget[0].value = 500;

const getLimit = (user, limits) => (spendingLimits[user] ? limits[user] : 0);
const addExpense = function (state, limits, value, description, user = "liza") {
  const cleanUser = user.toLowerCase();
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");

const checkExpenses = (state, limits) =>
  state.map((entry) =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  let output = state
    .reduce((res, entry) => {
      return (res +=
        entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "");
    }, "")
    .slice(0, -2);
  console.log(output);
};

logBigExpenses(finalBudget, 1000);
