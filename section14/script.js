"use strict";

const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const liza = new Person("Liza", 2002);
console.log(liza);
console.log(liza instanceof Person);

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};
liza.calcAge();

console.log(Person.prototype.isPrototypeOf(liza));
console.log(Person.prototype.isPrototypeOf(Person));

console.log(liza.hasOwnProperty("firstName"));
const arr = [1, 2, 3, 4, 5];
console.log(arr.__proto__);

const h1 = document.querySelector("h1");
//console.dir(h1);

class PersonCL {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2021 - this.birthYear);
  }
  static hey() {
    console.log("Hey there");
    console.log(this);
  }
}

PersonCL.prototype.greet = function () {
  console.log(`Hey, ${this.firstName}`);
};

const account = {
  owner: "liza",
  movements: [200, 530, 100, 320],

  get latest() {
    return this.movements[this.movements.length - 1];
  },
  set latest(mov) {
    return this.movements.push(mov);
  },
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  },
  get fullName() {
    return this._fullName;
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);
account.fullName = "Liza Dolgova";
console.log(account);

const PersonProto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);
steven.init("Steven", 2009);
steven.calcAge();
console.log(steven);

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Returns an empty object
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I'm at ${this.course} course`);
};

Student.prototype.constructor = Student;
const anna = new Student("Anna", 2002, 2);
console.log(anna);

class StudentCL extends PersonCL {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(
      `My name is ${this.firstName} and I'm at ${this.course} course`
    );
  }
}

const john = new StudentCL("John", 2000, 4);
console.log(john);
john.calcAge();
john.introduce();

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
const jay = Object.create(StudentProto);
jay.init("Jay", 2011, 3);

class Account {
  //Public fields
  locale = navigator.language;
  _movements = [];

  //Private fields - not currently supported
  //#movements = [];
  //#pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;

    //protected property
    //this._movements = [];
    //this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  //Public methods
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
    return this;
  }
  withdraw(val) {
    this._movements.push(-val);
    return this;
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
    }
    return this;
  }

  //Private methods - not supported
  //#approveLoan(val) {
  // return true;
  //}
}

const acc1 = new Account("Liza", "EUR", 1111);
acc1
  .deposit(300)
  .withdraw(150)
  .withdraw(150)
  .requestLoan(500)
  .deposit(110)
  .requestLoan(50);

console.log(acc1);
console.log(acc1.getMovements());
