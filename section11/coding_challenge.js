"use strict";

const Julia = [3, 5, 2, 12, 7];
const Kate = [4, 1, 15, 8, 3];
const Julia2 = [9, 16, 6, 8, 3];
const Kate2 = [10, 5, 6, 1, 4];

//Coding challenge 1
function checkDogs(arr1, arr2) {
  const arr1Corrected = arr1.splice(1, arr1.length - 2);
  const allDogs = arr1Corrected.concat(arr2);
  allDogs.forEach((age, i) => {
    if (age < 3) console.log(`Dog ${i + 1} is a puppy`);
    else console.log(`Dog ${i + 1} is an adult`);
  });
  console.log("----All dogs checked----");
}

checkDogs(Julia, Kate);
checkDogs(Julia2, Kate2);

//Coding challenge 2

function calcAverageHumanAge(ages) {
  const adultsAges = [];
  ages.forEach((age) => {
    let humanAge;
    if (age <= 2) humanAge = 2 * age;
    else humanAge = 16 + age * 4;
    if (humanAge >= 18) adultsAges.push(humanAge);
  });
  const average =
    adultsAges.reduce((acc, cur) => acc + cur, 0) / adultsAges.length;
  return average;
}

const dogAges = [5, 2, 4, 1, 15, 8, 3];
const dogAges2 = [16, 6, 10, 5, 6, 1, 4];
console.log(calcAverageHumanAge(dogAges));
console.log(calcAverageHumanAge(dogAges2));

//Coding challenge 3
const calcAverageHumanAge2 = (ages) =>
  ages
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge2(dogAges));
console.log(calcAverageHumanAge2(dogAges2));

//Coding challenge 4

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach((dog) => {
  dog.recommendedFood = Math.round(dog.weight ** 0.75 * 28);
});
console.log(dogs);

const SarahsDog = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(SarahsDog);
SarahsDog.curFood > SarahsDog.recommendedFood * 0.9
  ? console.log("Sarah's dog eats too much")
  : console.log("Sarah's dog eats too little");

const ownersEatToMuch = dogs
  .filter((dog) => dog.curFood > dog.recommendedFood * 1.1)
  .map((dog) => dog.owners)
  .forEach((owner) => {
    console.log(`${owner?.join(" and ")} dog eats too much`);
  });

const ownersEatToLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood * 0.9)
  .map((dog) => dog.owners)
  .forEach((owner) => {
    console.log(`${owner?.join(" and ")} dog eats too little`);
  });

console.log("----Dogs eating OK----");
const eatingOk = (dog) =>
  dog.curFood >= dog.recommendedFood * 0.9 &&
  dog.curFood <= dog.recommendedFood * 1.1;
console.log(dogs.some(eatingOk));

console.log("----Dogs eating right----");
const eatingRight = (dog) => dog.curFood === dog.recommendedFood;
console.log(dogs.some(eatingRight));

console.log("----Dogs eating OK array----");
const dogsEatingOk = [];
dogsEatingOk.push(dogs.find(eatingOk));
console.log(dogsEatingOk);

const dogsCopy = dogs
  .slice()
  .sort((dog1, dog2) => dog1.recommendedFood - dog2.recommendedFood);
console.log("----Dogs copy----");
console.log(dogsCopy);
