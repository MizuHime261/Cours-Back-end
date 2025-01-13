import Product from '../models/Product.js';

export default class ProductManager<T extends Product> {
    private products: T[];

    constructor() {
        this.products = [];
    }

    addProduct(product: T): void {
        this.products.push(product);
    }

    removeProductById(id: number): void {
        this.products = this.products.filter(product => product.getId() !== id);
    }

    listProducts(): T[] {
        return this.products;
    }

    findProductBy<K extends keyof T>(key: K, value: T[K]): T | undefined {
        return this.products.find(product => product[key] === value);
    }
    
    filterProductsBy<K extends keyof T>(key: K, value: T[K]): T[] {
        return this.products.filter(product => product[key] === value);
    }

    calculateTotalValue(): number {
        return this.products.reduce((total, product) => total + product.getPrice(), 0);
    }

    isIdUnique(id: number): boolean {
        return !this.products.some(product => product.getId() === id);
    }
}