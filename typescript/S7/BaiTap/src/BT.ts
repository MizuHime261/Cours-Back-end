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