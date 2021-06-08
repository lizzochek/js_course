"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

//Coding challenge 1
const renderCountry = (data, className = "") => {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} mln people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

//Asynchronous API

const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

getPosition()
  .then((res) =>
    console.log(
      `Current: position ${res.coords.latitude}, ${res.coords.longitude}`
    )
  )
  .catch((err) => console.log(err.message));

const whereAmI = () => {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => console.log(`Error: ${err.message}`));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);

btn.addEventListener("click", whereAmI);

//Coding challenge 2

const wait = (sec) =>
  new Promise((resolve) => {
    setTimeout(resolve, sec * 1000);
  });

const imgContainer = document.querySelector(".images");
const createImg = (imgPath) =>
  new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", () => {
      reject(new Error("Image not found"));
    });
  });

let currentImg;

/*
createImg("img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log("First image loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImg("img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log("Second image loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImg("img/img-2.jpg").then((img) => {
      currentImg = img;
      console.log("Third image loaded");
      return wait(2);
    });
  })
  .catch((err) => console.log(err));
*/

//Coding challenge 3

const loadImg = async function () {
  try {
    let img = await createImg("img/img-1.jpg");
    console.log("First image loaded");
    await wait(2);
    img.style.display = "none";

    let img2 = await createImg("img/img-2.jpg");
    console.log("Second image loaded");
    await wait(2);
    img2.style.display = "none";

    let img3 = await createImg("img/img-3.jpg");
    console.log("Third image loaded");
    await wait(2);
    img3.style.display = "none";
  } catch (err) {
    console.log(err);
  }
};
loadImg();

const loadAll = async function (imgsArr) {
  try {
    const imgs = imgsArr.map((img) => createImg(`img/${img}`));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.log(err);
  }
};
loadAll(["img-1.jpg", "img-2.jpg", "img-3.jpg"]);
