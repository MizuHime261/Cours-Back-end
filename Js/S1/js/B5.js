// Sắp xếp theo thứ tự
let a = parseInt(prompt("Nhập a: "));
let b = parseInt(prompt("Nhập b: "));
let c = parseInt(prompt("Nhập c: "));

if(a <= b && a <= c) {
    if(b <= c) {
        console.log(a + " " + b + " " + c);
    } else {
        console.log(a + " " + c + " " + b);
    }
}
if(b <= a && b <= c) {
    if(a <= c) {
        console.log(b + " " + a + " " + c);
    } else {
        console.log(b + " " + c + " " + a);
    }
}   
if(c <= a && c <= b) {
    if(a <= b) {
        console.log(c + " " + a + " " + b);
    } else {
        console.log(c + " " + b + " " + a);
    }
}