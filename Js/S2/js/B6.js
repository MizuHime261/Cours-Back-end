function calculateS(n) {
    let S = 1;
    for (let i = 2; i <= n; i++){
        S += 1 / (i ** 3);
    }
    return S.toFixed(5);
}

let n = parseInt(prompt("Nhập số nguyên dương: "));
if (n > 0) {
    console.log(calculateS(n));
} else {
    console.log("Vui lòng nhập số nguyên dương.");
}