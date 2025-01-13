export default abstract class Product {
    protected id: number;
    protected name: string;
    protected price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getId(): number {
        return this.id;
    }
     getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    abstract getDetails(): string;

    calculateDiscount(discount: number): number {
        return this.price * (1 - discount / 100);
    }

    displayBaseInfo(): string {
        return `Id: ${this.id} Product: ${this.name}, Price: ${this.price}`;
    }
}