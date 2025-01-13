export default class ProductManager {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProductById(id) {
        this.products = this.products.filter(product => product.getId() !== id);
    }
    listProducts() {
        return this.products;
    }
    findProductBy(key, value) {
        return this.products.find(product => product[key] === value);
    }
    filterProductsBy(key, value) {
        return this.products.filter(product => product[key] === value);
    }
    calculateTotalValue() {
        return this.products.reduce((total, product) => total + product.getPrice(), 0);
    }
    isIdUnique(id) {
        return !this.products.some(product => product.getId() === id);
    }
}
