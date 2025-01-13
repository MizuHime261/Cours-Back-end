import Product from "./Product.js";

export default class Book extends Product {
    private category: string;

    constructor(id: number, name: string, price: number, category: string) {
        super(id, name, price);
        this.category = category;
    }

    getDetails(): string {
        return `Id: ${this.id} Tên sách: ${this.name}, Thể loại: ${this.category}, Giá: ${this.price}`;
    }
}