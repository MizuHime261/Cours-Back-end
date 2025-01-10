function getFirstNumber(number: number[]) : number {
    return number[0];
}

function getFirstString(string: string[]) : string {
    return string[0];
}

interface User {
    id?: number;
    name?: string;
}

const updateUser: Partial<User> = { id: 1 };
const user: Required<User> = { id: 1, name: 'John' };
const user2: Readonly<User> = { id: 1, name: 'John' };

function getFirstUser(users: User[]) : User {
    return users[0];
}

console.log(getFirstNumber([1, 2, 3]));
console.log(getFirstString(['a', 'b', 'c']));

console.log(getFirstUser([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]));

type InputType = number | User | string;

function getFirst(input: InputType[]) : InputType {
    return input[0];
}

console.log(getFirst([1, 2, 3]));
console.log(getFirst(['a', 'b', 'c']));
console.log(getFirst([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]));

function getFirst2<T>(input: T[]) : T {
    return input[0];
}

console.log(getFirst2<number>([1, 2, 3]));
console.log(getFirst2<string>(['a', 'b', 'c']));
console.log(getFirst2<User>([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]));

function merge<T extends object, U extends object>(obj1: T, obj2: U) {
    return Object.assign(obj1, obj2);
}

const mergedObj = merge({ name: "Trang Ne"}, {age: 17});
console.log(mergedObj.name);
console.log(mergedObj.age);

let mergedObj2 = merge<{status: boolean}, {age: number}>(
    { status: true}, {age: 17}
);
console.log(mergedObj2.status);
console.log(mergedObj2.age);

let mergedObj3 = merge<{name: string}, {age: number}>(
    { name: "trang"}, {age: 17}
);

function count <T>(a: T[]): string {
    if (a.length === 0) {
        return "No elements";
    }
    return `Have ` + a.length + ` elements`;
}

console.log(count([1, 2, 3]));
console.log(count(['a']));
console.log(count([]));

function extracAndConvert<T extends object, U extends keyof T> (obj: T, key: U) {
    return obj[key];
}
console.log(`name: ` + extracAndConvert({name: "Trang", age: 18}, "name"));
console.log(`age: ` + extracAndConvert({name: "Trang", age: 18}, "age"));

class storage<T> {
    private _data: T;

    constructor(data: T) {
        this._data = data;
    }

    getData() : T {
        return this._data;
    }

    setData(data: T) {
        this._data = data;
    }
}

const numberStorage = new storage<number>(100);
console.log(numberStorage.getData());
numberStorage.setData(200);
console.log(numberStorage.getData());

const stringStorage = new storage<string>("Hello");