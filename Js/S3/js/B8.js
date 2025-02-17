// Đề bài: khai báo mảng gồm nhiều phần tử bất kỳ, tìm ra phần tử đầu tiên là độc  nhất trong mảng
function findUniqueElement(arr) {
    let elementCount = {};
    // Đếm số lần xuất hiện của mỗi phần tử trong mảng
    for (let i of arr) {
        elementCount[i] = (elementCount[i] || 0) + 1;
    }

    // // Duyệt mảng để tìm phần tử đầu tiên có số lần xuất hiện là 1
    for (let i of arr) {
        if (elementCount[i] === 1) {
            return i;
        }
    }

    return "Trong mảng không có phần tử độc nhất";
}

function inputArr() {
    let input = prompt("Nhập vào mảng phân cách bởi dấu phẩy:");
    return input.split(',').map(Number);
}

let arr = inputArr();

console.log(`Mảng đã nhập: ${arr.join(', ')}`);
console.log(`Phần tử đầu tiên là độc nhất: ${findUniqueElement(arr)}`);