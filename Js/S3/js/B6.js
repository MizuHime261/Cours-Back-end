// Đề bài: sắp xếp lại mảng sao cho các phần tử chẵn nằm ở đầu mảng, các phần tử lẻ nằm ở cuối mảng
function sortEvenOdd(arr) {
    let even = arr.filter(num => num % 2 === 0).sort((a, b) => a - b);
    let odd = arr.filter(num => num % 2 !== 0).sort((a, b) => a - b);
    return [...even, ...odd];
}

let input = prompt("Nhập mảng số nguyên, cách nhau bằng dấu phẩy:");
let arr = input.split(',').map(Number);

console.log(`Mảng đã nhập: ` + arr.join(' '));
console.log(`Mảng đã sắp xếp chẵn tăng dần, lẻ tăng dần: ` + sortEvenOdd(arr).join(' '));