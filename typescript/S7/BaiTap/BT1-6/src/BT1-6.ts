console.log("Bai tap 1: ");
function swap<T>(tuple: [T, T]): [T, T] {
    return [tuple[1], tuple[0]];
}
console.log(`Ban dau: ` + [1, 2] + ` Mang sau: ` + swap([1, 2]));
console.log(`Ban dau: ` + ["a", "b"] + ` Mang sau: ` + swap(["a", "b"]));


console.log("Bai tap 2: ");
function getFirstElement<T >(arr: T[]): T | undefined {
    return arr.shift();
}
console.log(`Phan tu dau tien trong mang ` + [1, 2, 3] + ` la: `+ getFirstElement([1, 2, 3]));
console.log(`Phan tu dau tien trong mang ` + ["a", "b", "c"] + ` la: `+ getFirstElement(["a", "b", "c"]));
console.log(`Phan tu dau tien trong mang ` + [] + ` la: `+ getFirstElement([]));


console.log("Bai tap 3: ");
function mergeObject<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}
console.log(mergeObject({ a: 1 }, { b: 2 }));


console.log("Bai tap 4: ");
function pluck<T, K extends keyof T>(array: T[], key: K): T[K][] {
    return array.map(item => item[key]);
}
const user = [
    { name: "Trang", age: 17 },
    { name: "Huong", age: 18 },
    { name: "Huyen", age: 19 },
]
console.log(pluck(user, "name"));
console.log(pluck(user, "age"));


console.log("Bai tap 5: ");
function filterByProperty<T, K extends keyof T>(array: T[], key: K, value: T[K]): T[] {
    return array.filter(item => item[key] === value);
}
const products1 = [
    {id: 1, name: "Laptop", category: "Electronics"},
    {id: 2, name: "Dress", category: "Fashion"},
    {id: 3, name: "Mobile", category: "Electronics"},
]
console.log(filterByProperty(products1, "category", "Electronics"));


console.log("Bai tap 6: ");
function sumByProperty<T extends Record<K, number>, K extends keyof T>(array: T[], key: K): number {
    return array.reduce((sum, item) => sum + item[key], 0);
}
const orders = [
    {id: 1, amount: 100},
    {id: 2, amount: 200},
    {id: 3, amount: 300},
]
console.log(sumByProperty(orders, "amount"));