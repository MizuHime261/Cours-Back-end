function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function gcdOfFour (a, b, c, d) {
    return gcd(gcd(gcd(a, b), c), d);
}

function getPositiveNumber(order) {
    let num;
    do {
        num = parseInt(prompt(`Nhập số nguyên dương thứ ${order}: `), 10);
        if (num <= 0 || isNaN(num)) {
            console.log("Vui lòng nhập một số nguyên dương hợp lệ.");
        }
    } while (num <= 0 || isNaN(num));
    return num;
}

let a = getPositiveNumber(1);
let b = getPositiveNumber(2);
let c = getPositiveNumber(3);
let d = getPositiveNumber(4);

console.log(`Ước chung lớn nhất của 4 số là: ${gcdOfFour(a, b, c, d)}`);