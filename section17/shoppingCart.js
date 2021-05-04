//Exporting module
console.log("Exporting module");

//Scoped to current module
const shippingCost = 10;
export const cart = [];

export const addToCart = (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 275;
const totalQuantity = 17;
export { totalQuantity, totalPrice };
export default (product, quantity) => {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
