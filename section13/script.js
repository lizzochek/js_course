"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", (el) => {
  const s1coords = section1.getBoundingClientRect();

  /*
  console.log(e.target.getBoundingClientRect());
  console.log("Current scroll (X/Y", window.pageXOffset, pageYOffset);
  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  
  //Old way
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });
  */
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Menu fade
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", (e) => handleHover(e, 0.5));

nav.addEventListener("mouseout", (e) => handleHover(e, 1));

/*
//Bad performance
const initialCoords = section1.getBoundingClientRect();
//Sticky navigation
window.addEventListener("scroll", () => {
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});
*/

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Reveal sections
const allSections = document.querySelectorAll(".section");
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => sectionObserver.observe(section));

//Lazy image loading
const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//Slider creation

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dotContainer = document.querySelector(".dots");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const createDots = () => {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
const activateDot = (slide) => {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add(`dots__dot--active`);
};

goToSlide(0);
createDots();
activateDot(0);

//Next slide
let currentSlide = 0;
const maxSlide = slides.length - 1;

const nextSlide = () => {
  if (currentSlide === maxSlide) currentSlide = 0;
  else currentSlide++;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

//Previous slide
const prevSlide = () => {
  if (currentSlide === 0) currentSlide = maxSlide;
  else currentSlide--;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  else if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(allSections);
document.getElementById("#section--1");
//HTML collection updates on changes
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);
document.getElementsByClassName("btn");

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  "We use cookies for improved functionality. <button class='btn btn--close--cookie'>Got it!</button>";
header.append(message); //Inserts as the last child

//header.prepend(message.cloneNode(true));
//header.before(message);
//header.after(message);
document
  .querySelector(".btn--close--cookie")
  .addEventListener("click", () => message.remove());

//Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
console.log(getComputedStyle(message).color);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

//document.documentElement.style.setProperty("--color-primary", "orangered");

//Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute("src"));

console.log(logo.className);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

const link = document.querySelector(".nav__link--btn");
console.log(link.href);
console.log(link.getAttribute("href"));

//Data attributes
console.log(logo.dataset.versionNumber);

//Classes
/*
logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();

don't use
logo.className = "liza";


const h1 = document.querySelector("h1");
h1.addEventListener("mouseenter", (e) => alert("addEventListener: Great!"));
//h1.onmouseenter = (e) => alert("addEventListener: Great!");

const randomColor = () => {
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const color = `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(
    0,
    255
  )})`;
  return color;
};

document.querySelector(".nav__link").addEventListener("click", (e) => {
  e.currentTarget.style.backgroundColor = randomColor();

  //Stop parent evens from handling the event
  //e.stopPropagation();
});
document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.currentTarget.style.backgroundColor = randomColor();
});
document.querySelector(".nav").addEventListener(
  "click",
  (e) => {
    e.currentTarget.style.backgroundColor = randomColor();
  },
  true //use capture parameter
);
*/

document.addEventListener("DOMContentLoaded", (e) => {
  console.log("HTML parsed and DOM tree bulit", e);
});

window.addEventListener("load", (e) => {
  console.log("Page fully loaded", e);
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = "";
});
