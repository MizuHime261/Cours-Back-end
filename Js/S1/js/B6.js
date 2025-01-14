function nhapcanh(tenCanh) {
    let canh;
    do {
        canh = parseInt(prompt(`Nhập cạnh ${tenCanh}: `));
        if (isNaN(canh) || canh <= 0) {
            console.log("Vui lòng nhập số nguyên dương!");
        }
    } while (isNaN(canh) || canh <= 0); 
    return canh; 
}

while (true) {
    console.log("Nhập vào 3 cạnh của tam giác!");

    let a = nhapcanh("a");
    let b = nhapcanh("b");
    let c = nhapcanh("c");

    if (a + b > c && a + c > b && b + c > a) {
        if (a === b && b === c) {
            console.log("Tam giác đều");
        }
        else if (a === b || a === c || b === c) {
            console.log("Tam giác cân");
        }
        else if (a * a + b * b === c * c || a * a + c * c === b * b || b * b + c * c === a * a) {
            console.log("Tam giác vuông");
        }
        else {
            console.log("Tam giác thường");
        }
        break;
    } else {
        console.log("Không phải tam giác. Vui lòng nhập lại.");
    }
}
