"use strict";

function calcAge(birthYear) {
  const age = 2021 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millennial = true;
      const firstName = "Steven";
      const str = `Oh, and you're a millennial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      output = "NEW OUTPUT!";
    }
    // console.log(str);
    console.log(millennial);
    // console.log(add(2, 3));
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = "Liza";
calcAge(1991);
// console.log(age);
// printAge();

//Variables hoisting

console.log(me);
//console.log(job);
//console.log(year);

var me = "Liza";
let job = "programmer";
const year = 2002;

//Function hoisting

console.log(addDecl(2, 3));
//console.log(addExp(2, 3));
//console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExp = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

//Example
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log("All products deleted!");
}

var x = 1;
let y = 2;
const z = 3;

console.dir(this);
const calcAge1 = function (birthYear) {
  console.log(2021 - birthYear);
  console.log(this);
};
calcAge1(2002);

const calcAgeArr = (birthYear) => {
  console.log(2021 - birthYear);
  console.log(this);
};
calcAgeArr(2002);

const liza = {
  firstName: "Liza",
  year: 2002,
  age: function () {
    console.log(this);
    console.log(2021 - this.year);

    //Use arrow not declaration to get outer this or use self
    //const self = this;
    const isMillennial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillennial();
  },
  greet: () => console.log(`Hey, ${this.firstName}`),
};

liza.age();
liza.greet();

const matilda = {
  year: 2017,
};

matilda.age = liza.age;
matilda.age();

//const f = liza.age;
//f();

function addDecl1(a, b) {
  console.log(arguments);
  return a + b;
}

const addExp1 = function (a, b) {
  console.log(arguments);
  return a + b;
};

const addArrow1 = (a, b) => {
  console.log(arguments);
  return a + b;
};

addDecl1(2, 3);
addExp1(2, 4, 5, 7);
addArrow1(2, 4, 5, 7);

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me1 = {
  name: "Liza",
  age: 30,
};

const friend = me1;
friend.age = 27;
console.log(me1);
console.log(friend);

let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName);
console.log(oldLastName);

const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = "Davis";
console.log(jessica);
console.log(marriedJessica);

//A shallow copy
const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Jenna", "Bob"],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "Davis";
jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");

console.log(jessica2);
console.log(jessicaCopy);
