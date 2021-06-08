"use strict";

let temp = [12, 15, 30, -1, "error", -4, -6, -2, 0];
let temp2 = [14, "string", 21, 46, -2, 12, 76];

//Variant 1
const calc = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number") arr.splice(i, 1);
  }

  let max = Math.max.apply(Math, arr);
  let min = Math.min.apply(Math, arr);
  let diff = max - min;
  return diff;
};

//Variant 2

function calc2(arr) {
  arr.map((el) => {
    if (typeof el !== "number") arr.splice(arr.indexOf(el), 1);
  });
  let max = arr[0];
  let min = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
  }
  let diff = max - min;
  return diff;
}

//Max of two arrays
function calc3(arr1, arr2) {
  let arr3 = arr1.concat(arr2);
  return console.log(calc(arr3));
}

//Debugging
function Kelvin() {
  const measurement = {
    type: "temp",
    unit: "celsius",
    value: parseInt(prompt("Degrees celsius")),
    //Number(prompt("Degrees celsius"))
  };
  const kelvin = measurement.value + 273;
  return kelvin;
}

function calcTempAptitude(t1, t2) {
  const temps = t1.concat(t2);

  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== "number") continue;
    if (temps[i] > max) max = temps[i];
    if (temps[i] < min) min = temps[i];
  }
  console.log(max, min);
  return max - min;
}

console.log(calc(temp));
console.log(calc2(temp));

calc3(temp, temp2);

console.log(Kelvin());

const newAptitude = calcTempAptitude([1, 3, 4, "string"], [3, 6, 10]);
console.log(newAptitude);

//Coding challenge
function printForecast(arr) {
  let forecast = ``;
  for (let i = 0; i < arr.length; i++) {
    forecast += `...${arr[i]}°C in ${i + 1} days`;
  }
  return forecast;
}

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];
console.log(printForecast(data1));
console.log(printForecast(data2));
