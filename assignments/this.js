/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Defaults to window no where else to point.
* 2. Implicit binding points at where the funciton is called.
* 3. Creates a new object that this is bound to.
* 4. Explicit binding allows for the function to be seperate from the object and pass arguements.
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding

let sayHi = function() {
    console.log(this.greeting);
};

let me = {
    greeting : "Hello!"
};

sayHi();

// Principle 2

// code example for Implicit Binding

let meAgain = {
    name: "Jay",
    sayName: function() {
        console.log(this.name);
    }
}

meAgain.sayName();

// Principle 3

// code example for New Binding

let Person = function(name, aPhrase) {
    this.name = name;
    this.aPhrase = aPhrase;
}

var itsMeAgain = new Person('Jay', 'I am ready to keep learning!');

console.log(itsMeAgain.name + " says " + "'" + itsMeAgain.aPhrase + "'");

// Principle 4

// code example for Explicit Binding

let sayName = function(arg) {
    console.log(this.name + ` likes to program in ` + arg);
};

let anotherMe = {
    name: "Jay",
}

let lang = ["Javascript"]

sayName.call(anotherMe, lang);