/*import { addToCart, totalPrice, totalQuantity } from "./shoppingCart.js";
console.log("Importing module");
addToCart("bread", 5);
console.log(totalQuantity, totalPrice);
*/
import * as ShoppingCart from "./shoppingCart.js";
ShoppingCart.addToCart("bread", 5);

import add from "./shoppingCart.js";
add("pizza", 2);

const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCost = 10;
  const totalPrice = 753;
  const totalQuantity = 74;

  const addToCart = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);

/*
Common js, works in node
export.addToCart = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };
  const { addToCart } = require("./shoppingCart.js")
*/

//import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 3 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
state.user.loggedIn = false;

const stateDeepCLone = cloneDeep(state);

if (module.hot) module.hot.accept();

class Person {
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
  greeting = "Hey";
}

const Liza = new Person("Liza");
console.log("Liza" ?? null);
console.log(state.cart.find((el) => el.quantity >= 2));

import "core-js/stable";
import "regenerator-runtime/runtime";
