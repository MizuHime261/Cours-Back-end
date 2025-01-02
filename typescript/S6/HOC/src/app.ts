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

abstract class Rikkei {
    private _taxCode: string;
    private _stakeholders: any[];

    constructor(taxCode: string) {
        this._taxCode = taxCode;
        this._stakeholders = [{ name: "Minh Cuong", share: "100%"}];
    }

    protected showTaxCode() {
        console.log(`Rikke Tax Code is ${this._taxCode}`)
    }

    abstract payTaxes(): void;
}

class RikkeEducation extends Rikkei {
    private _bod: string[];

    constructor(bod: string[]) {
        super("478392");
        this._bod = bod;
    }
    override payTaxes(): void {
        console.log("Di dong thue");
    }
}

let rikkeEducation = new RikkeEducation(["Umi", "Yuki"]);

abstract class Human {
    private _gene: string;

    constructor(gene: string) {
        this._gene = gene;
    }

    abstract reproduce(): void;
}

abstract class Person extends Human {
    private _gender: boolean;

    constructor(gender: boolean, gene: string) {
        super(gene);
        this._gender = gender;
    }

    abstract hunt(): void;
}

class Student extends Person{
    private _name: string;

    constructor(name: string, gender: boolean, gene: string){
        super(gender, gene);
        this._name = name;
    }

    study() {
        console.log("Lam bai tap");
    }

    reproduce(): void {
        console.log("Sinh san di");
    }

    hunt(): void {
        console.log("Can cu bu thong minh!!! Khong lam doi co an!!!");
    }
}


interface Sales {
    name: string;

    sale(): void;
}

interface Marketing {
    name: string;
    
    marketing(): void;
}

class RK implements Sales, Marketing {
    public name: string;

    constructor(name: string){
        this.name = name;
    }

    marketing(): void {
        console.log("Doing marketing");   
    }

    doingDMarketing(): void {
        console.log("Doing digital marketing");
    }

    sale(): void {
        console.log("Doing sale");
    }
}


interface Person {
    name: string;
    age: number;
}