"use strict";

//Coding challenge 1

const Car = function (brand, speed) {
  this.brand = brand;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.brand} is going at ${this.speed} km/h`);
  return this;
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.brand} is going at ${this.speed} km/h`);
  return this;
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

mercedes.accelerate().accelerate().brake().brake();
bmw.brake().brake().brake().accelerate();

class CarCl {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(spd) {
    return (this.speed = spd * 1.6);
  }
}
const ford = new CarCl("Ford", 120);
console.log(`Current speed: ${ford.speedUS} mi/h`);
ford.speedUS = 50;
console.log(`Current speed: ${ford.speed} mi/h`);

const ElectricCar = function (brand, speed, charge) {
  Car.call(this, brand, speed);
  this.charge = charge;
};

ElectricCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  return this;
};

ElectricCar.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.brand} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
  return this;
};

const tesla = new ElectricCar("Tesla", 45, 35);
tesla.chargeBattery(90).accelerate().accelerate().accelerate();

class ElectricCarCL extends CarCl {
  //Make a private class
  //#charge
  constructor(brand, speed, charge) {
    super(brand, speed);
    this.charge = charge;
  }
  chargeBattery(chargeTo) {
    this.charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.charge--;
    console.log(
      `${this.brand} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
    );
    return this;
  }
}

const kia = new ElectricCarCL("Kia", 75, 85);
kia.chargeBattery(90).accelerate().accelerate().accelerate();
