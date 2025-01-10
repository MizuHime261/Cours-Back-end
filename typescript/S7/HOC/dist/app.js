"use strict";
function getFirstNumber(number) {
    return number[0];
}
function getFirstString(string) {
    return string[0];
}
const updateUser = { id: 1 };
const user = { id: 1, name: 'John' };
const user2 = { id: 1, name: 'John' };
function getFirstUser(users) {
    return users[0];
}
console.log(getFirstNumber([1, 2, 3]));
console.log(getFirstString(['a', 'b', 'c']));
console.log(getFirstUser([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]));
function getFirst(input) {
    return input[0];
}
console.log(getFirst([1, 2, 3]));
console.log(getFirst(['a', 'b', 'c']));
console.log(getFirst([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]));
function getFirst2(input) {
    return input[0];
}
console.log(getFirst2([1, 2, 3]));
console.log(getFirst2(['a', 'b', 'c']));
console.log(getFirst2([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]));
function merge(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
const mergedObj = merge({ name: "Trang Ne" }, { age: 17 });
console.log(mergedObj.name);
console.log(mergedObj.age);
let mergedObj2 = merge({ status: true }, { age: 17 });
console.log(mergedObj2.status);
console.log(mergedObj2.age);
let mergedObj3 = merge({ name: "trang" }, { age: 17 });
function count(a) {
    if (a.length === 0) {
        return "No elements";
    }
    return `Have ` + a.length + ` elements`;
}
console.log(count([1, 2, 3]));
console.log(count(['a']));
console.log(count([]));
function extracAndConvert(obj, key) {
    return obj[key];
}
console.log(`name: ` + extracAndConvert({ name: "Trang", age: 18 }, "name"));
console.log(`age: ` + extracAndConvert({ name: "Trang", age: 18 }, "age"));
class storage {
    constructor(data) {
        this._data = data;
    }
    getData() {
        return this._data;
    }
    setData(data) {
        this._data = data;
    }
}
const numberStorage = new storage(100);
console.log(numberStorage.getData());
numberStorage.setData(200);
console.log(numberStorage.getData());
const stringStorage = new storage("Hello");
