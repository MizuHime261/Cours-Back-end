function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function printNPrimes(n) {
    let count = 0;
    let num = 2;
    while (count < n) {
        if (isPrime(num)) {
            console.log(num);
            count++;
        }
        num++;
    }
}

let n = parseInt(prompt("Nhập số lượng số nguyên tố cần in ra: "));

if (n > 0) {
    printNPrimes(n);
} else {
    console.log("Vui lòng nhập số nguyên dương.");
}