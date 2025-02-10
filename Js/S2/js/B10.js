function printTriangle(n) {
    let triangle = "";
    for (let i = n; i >= 1; i--) {
        for (let j = 0; j < i; j++) {
            triangle += "*";
        }
        triangle += "\n";
    }
    return triangle;
}

function printInvertedTriangle(n) {
    let triangle = "";
    for (let i = n; i >= 1; i--) {
        for (let j = 0; j < n - i; j++) {
            triangle += " ";
        }
        for (let k = 0; k < i; k++) {
            triangle += "*";
        }
        triangle += "\n";
    }
    return triangle;
}

let n = parseInt(prompt("Nhập chiều cao của tam giác: "));

if (n > 0) {
    console.log(printTriangle(n));
    console.log(printInvertedTriangle(n));
} else {
    console.log("Vui lòng nhập số nguyên dương.");
}