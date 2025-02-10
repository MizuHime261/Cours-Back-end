function fibonacci(n) {
    let a = 0, b = 1;
    let result = [a];
    let sum = a;
    while (sum + b < n) {
        result.push(b);
        sum += b;
        let temp = a + b;
        a = b;
        b = temp;
    }
     console.log(result.join(" "));
}

let n = parseInt(prompt("Nhập số nguyên dương: "));

if (n > 0) {
    fibonacci(n);
} else {
    console.log("Vui lòng nhập số nguyên dương.");
}