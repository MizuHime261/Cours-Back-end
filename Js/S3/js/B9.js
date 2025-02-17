// sắp xếp mảng đã khai báo theo thứ tự ngẫu nhiên
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // Chọn một chỉ số ngẫu nhiên từ 0 đến i
        const j = Math.floor(Math.random() * (i + 1));
        // Hoán đổi các phần tử tại vị trí i và j
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Khai báo mảng
let input = prompt('Nhập vào mảng, cách nha bởi dấu phẩy: ')
    .split(',').map(Number);

console.log(`Mảng đã nhập: ${input.join(', ')}`);
console.log(`Mảng sắp xếp theo thứ tự ngẫu nhiên: ${shuffleArray(input)}`);