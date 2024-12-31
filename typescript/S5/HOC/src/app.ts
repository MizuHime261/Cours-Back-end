class Animal {
    protected _type: string;

    constructor(type: string){
        this._type = type;
    }

    get getType() {
        return this._type
    }

    set setType(type: string){
        this._type = type;
    }

    sound() {
        console.log("This is this animal sound");
    }
}

class Dog extends Animal {
    private _name: string;
    private _gender: boolean;

    constructor(name: string, gender: boolean){
        super("carnovore");
        this._name = name;
        this._gender = gender;
    }

    override sound(): void {
        super.sound();
        console.log("WOf WOff.....!!!");
    }

    introduce(){
        console.log(`
            This is ${this._name}. I am a ${this._gender ? "male" : "female"} dog
        `)
    }
}

let dog01 = new Dog("haha", true);