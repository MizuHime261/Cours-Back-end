"use strict";
class Animal {
    constructor(type) {
        this._type = type;
    }
    get getType() {
        return this._type;
    }
    set setType(type) {
        this._type = type;
    }
    sound() {
        console.log("This is this animal sound");
    }
}
class Dog extends Animal {
    constructor(name, gender) {
        super("carnovore");
        this._name = name;
        this._gender = gender;
    }
    sound() {
        super.sound();
        console.log("WOf WOff.....!!!");
    }
    introduce() {
        console.log(`
            This is ${this._name}. I am a ${this._gender ? "male" : "female"} dog
        `);
    }
}
let dog01 = new Dog("haha", true);
