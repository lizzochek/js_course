"use strict";

const bookings = [];

function createBooking(flightNum, passengersNum = 1, price = 199) {
  const booking = {
    flightNum,
    passengersNum,
    price,
  };
  console.log(booking);
  bookings.push(booking);
}
createBooking("LH123");
createBooking("LH123", 2, 80);
//Skipping parameter
createBooking("LH123", undefined, 100);

const flight = "LH1234";
const liza = {
  name: "Liza Dolgova",
  passport: 1239874563,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH99";
  passenger.name = "Ms. " + passenger.name;

  if (passenger.passport === 1239874563) {
    console.log("You are checked in");
  } else {
    console.log("Wrong passport!");
  }
};

//An object is just a link to the first one
//whereas the string is copied
checkIn(flight, liza);
console.log(flight);
console.log(liza);

function newPassport(person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
}

newPassport(liza);
console.log(liza);
checkIn(flight, liza);
//JS doesn't have pass by reference

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWd = function (str) {
  const [first, ...other] = str.split(" ");
  return [first.toUpperCase(), ...other].join(" ");
};

const transform = function (str, fn) {
  console.log(`Transformed string: \n${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transform("We are students here", upperFirstWd);
transform("We are students here", oneWord);

const greet = (greeting) => (name) => {
  console.log(`${greeting} ${name}`);
};

const greeterHey = greet("Hey");
greeterHey("Liza");
greeterHey("Anna");

const ukrAirlines = {
  airline: "Ukraine Airlines",
  iataCode: "IH",
  bookings: [],
  book(flightNum, passenger) {
    console.log(
      `${passenger} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      passenger,
    });
  },
};

ukrAirlines.book(239, "Liza Dolgova");

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

//This is undefined
const book = ukrAirlines.book;
//book(23, "Sarah Williams");
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);

const swiss = {
  airline: "Swiss airline",
  iataCode: "SW",
  bookings: [],
};
book.call(swiss, 27, "Marrie Adams");

const flightData = [583, "Liza Dolgova"];
book.apply(swiss, flightData);
book.call(swiss, ...flightData);

const bookEW = book.bind(eurowings);
const bookUA = book.bind(ukrAirlines);
const bookSW = book.bind(swiss);
bookEW(456, "Natalie");

const bookEW23 = book.bind(eurowings, 23);
bookEW23("Natalie");

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(400));

function addTax1(rate) {
  return function (value) {
    console.log(value + value * rate);
  };
}
const addVAT1 = addTax1(0.23);
addVAT1(400);

const runOnce = function () {
  console.log("This will never run again");
};
runOnce();

(function () {
  console.log("This will never run again");
  const isPrivate = 23;
})();

(() => {
  console.log("This will ALSO never run again");
})();

{
  const isPrivate = 23;
  var notPrivate = 46;
}

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(passengerCount);
  };
};

const booker = secureBooking();

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
h();
f();

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(() => {
    console.log(`We are boarding three groups of ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
