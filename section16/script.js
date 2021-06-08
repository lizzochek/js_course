"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////////////
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

const getCountryAndNeighbor = (country) => {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    const neighbors = data.borders;
    if (!neighbors.length) return;
    neighbors.forEach((neighbor) => {
      let request1 = new XMLHttpRequest();
      request1.open(
        "GET",
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`
      );
      request1.send();
      request1.addEventListener("load", function () {
        const data1 = JSON.parse(this.responseText);
        renderCountry(data1, "neighbour");
      });
    });
  });
};

//getCountryAndNeighbor("ukraine");
//getCountryAndNeighbor("usa");
//getCountryAndNeighbor("france");

//fetch(`https://restcountries.eu/rest/v2/name/ukraine`);
//Returns pending Promise

const getJSON = function (url, errMsg = "Something went wrong") {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(errMsg);
    return res.json();
  });
};

const renderError = (msg) => {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

const getCountryData = (country) => {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `Country not found`
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) throw new Error("No neighbour found");
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbor}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", () => getCountryData("ukraine"));

getCountryData("australia");

console.log("Test start");
setTimeout(() => console.log("0 second timer"), 0);
Promise.resolve("Resolved promise 1").then((res) => console.log(res));
Promise.resolve("Resolved promise 2").then((res) => {
  //for (let i = 0; i < 10000000000; i++) {}
  console.log(res);
});

console.log("Test end");

const lotteryPromise = new Promise((resolve, reject) => {
  console.log("Lottery draw is happening");
  setTimeout(() => {
    if (Math.random() >= 0.5) resolve("You won a lottery!");
    else reject("You lost :(");
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

const wait = (sec) => new Promise((resolve) => setTimeout(resolve, sec * 1000));
wait(5)
  .then(() => {
    console.log("I waited for 5 secs");
    return wait(1);
  })
  .then(() => console.log("I waited for 1 sec"));

const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

const whereAmIAsync = async function (country) {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error("Problem getting location data");
    const dataGeo = await resGeo.json();

    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    if (!res.ok) throw new Error("Problem getting location country");
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.log(err);

    //Rejecting returned promise
    //throw err;
  }
};

(async function () {
  try {
    const city = await whereAmIAsync("ukraine");
    if (!city) throw new Error("Problem getting location");
    console.log(city);
  } catch (err) {
    console.log(err);
  }
  console.log("Finished getting location");
})();

const getCapitals = async function (c1, c2, c3) {
  try {
    /*  const [data1] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${c1}`
    );
    const [data2] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${c2}`
    );
    const [data3] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${c3}`
    );
console.log([data1.capital, data2.capital, data3.capital]);
*/
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};
getCapitals("ukraine", "canada", "togo");

const timeout = (sec) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/italy`),
  timeout(1),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.log(err));

Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
]).then((res) => console.log(res));

/* New feature, doesn't work for now
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
]).then((res) => console.log(res));
*/
