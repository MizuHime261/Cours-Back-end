export class Person {
    constructor(id, name, email, phone) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
    }
    getId() {
        return this._id;
    }
    getName() {
        return this._name;
    }
    getDetails() {
        return `Khách hàng [ID: ${this._id}, Tên: ${this._name}, Email: ${this._email}, SĐT: ${this._phone}]`;
    }
}
