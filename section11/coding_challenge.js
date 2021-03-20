"use strict";

const Julia = [3, 5, 2, 12, 7];
const Kate = [4, 1, 15, 8, 3];
const Julia2 = [9, 16, 6, 8, 3];
const Kate2 = [10, 5, 6, 1, 4];

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
