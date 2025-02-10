function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

let num;

while (true) {
    num = parseInt(prompt("Nhập một số nguyên dương:"));

    if(!isNaN(num) && num > 0) {
        break;
    }
    alert("Vui lòng nhập một số nguyên dương.");
}

console.log(`Các số nguyên tố nhỏ hơn ${num}:`);
for (let i = 2; i < num; i++) {
    if (isPrime(i)) {
        console.log(i);
    }
}