"use strict";
// class Animal {
//     private _name: string;
//     constructor(name: string){
//         this._name = name;
//     }
//     introduce() {
//         console.log(`Hello! my name is ${this._name}`)
//     }
// }
// let animal1 = new Animal("Donald duck");
// animal1.introduce();
class Rikkei {
    constructor(taxCode) {
        this._taxCode = taxCode;
        this._stakeholders = [{ name: "Minh Cuong", share: "100%" }];
    }
    showTaxCode() {
        console.log(`Rikke Tax Code is ${this._taxCode}`);
    }
}
class RikkeEducation extends Rikkei {
    constructor(bod) {
        super("478392");
        this._bod = bod;
    }
    payTaxes() {
        console.log("Di dong thue");
    }
}
let rikkeEducation = new RikkeEducation(["Umi", "Yuki"]);
class Human {
    constructor(gene) {
        this._gene = gene;
    }
}
class Person extends Human {
    constructor(gender, gene) {
        super(gene);
        this._gender = gender;
    }
}
class Student extends Person {
    constructor(name, gender, gene) {
        super(gender, gene);
        this._name = name;
    }
    study() {
        console.log("Lam bai tap");
    }
    reproduce() {
        console.log("Sinh san di");
    }
    hunt() {
        console.log("Can cu bu thong minh!!! Khong lam doi co an!!!");
    }
}
class RK {
    constructor(name) {
        this.name = name;
    }
    marketing() {
        console.log("Doing marketing");
    }
    doingDMarketing() {
        console.log("Doing digital marketing");
    }
    sale() {
        console.log("Doing sale");
    }
}
