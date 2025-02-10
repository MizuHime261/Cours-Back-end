function reverseNumber(n) {
    let reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n = Math.floor(n / 10);
    }
    return reversed;
}

// function reverseNumber(n) {
//     return n.toString().split("").reverse().join("");
// }

let n = parseInt(prompt("Nhập số nguyên dương: "));

if (n > 0) {
    console.log(reverseNumber(n));
} else {
    console.log("Vui lòng nhập số nguyên dương.");
}