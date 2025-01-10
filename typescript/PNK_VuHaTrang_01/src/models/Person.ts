export class Person {
    private _id: number;
    private _name: string;
    private _email: string;
    private _phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
    }

    getId(): number {
        return this._id;
    }

    getName(): string {
        return this._name;
    }

    getDetails(): string {
        return `Khách hàng [ID: ${this._id}, Tên: ${this._name}, Email: ${this._email}, SĐT: ${this._phone}]`;
    }
}