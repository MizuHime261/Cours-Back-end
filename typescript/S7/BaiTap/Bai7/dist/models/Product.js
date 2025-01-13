export default class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    calculateDiscount(discount) {
        return this.price * (1 - discount / 100);
    }
    displayBaseInfo() {
        return `Id: ${this.id} Product: ${this.name}, Price: ${this.price}`;
    }
}
