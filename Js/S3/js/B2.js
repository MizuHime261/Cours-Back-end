// Đề bài: Viết hàm tìm các phần tử trùng lặp trong mảng số nguyên
function findDuplicateElements(arr){
    let elementCount = {};
    let duplicates = new Set();

    for (let i of arr) {
        elementCount[i] = (elementCount[i] || 0) + 1;
        if (elementCount[i] > 1) {
            duplicates.add(i);
        }
    }
    return duplicates.size > 0 ? Array.from(duplicates) : "Không có phần tử trùng lặp";
}

// function findDuplicateElements(arr) {
//     const elementCount = arr.map((num, index) => {
//         return arr.filter(item => item === num).length;
//     });

//     const duplicates = arr.filter((num, index) => 
//         elementCount[index] > 1 && arr.indexOf(num) === index
//     );

//     return duplicates.length > 0 ? [...new Set(duplicates)] : "Không có phần tử trùng lặp";
// }

let input = prompt("Nhập mảng số nguyên, cách nhau bằng dấu phẩy:");
let arr = input.split(',').map(Number);

console.log(`Mảng đã nhập: ` + arr.join(' '));
console.log(`Phần tủ trùng lặp: ` + findDuplicateElements(arr).join(' '));