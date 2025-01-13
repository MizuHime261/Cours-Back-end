import Product from "./Product.js";
export default class Book extends Product {
    constructor(id, name, price, category) {
        super(id, name, price);
        this.category = category;
    }
    getDetails() {
        return `Id: ${this.id} Tên sách: ${this.name}, Thể loại: ${this.category}, Giá: ${this.price}`;
    }
}
