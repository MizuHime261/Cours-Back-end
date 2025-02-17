// Tìm mảng con thỏa mãn điều kiện
function findSubarrayWithSum(arr, sum){
    for(let i = 0; i < arr.length; i++) {
        let sum = 0;
        let subArray = [];
        for(let j = i; j < arr.length; j++) {
            sum += arr[j];
            subArray.push(arr[j]);
            if (sum === target) {
                return subArray;
            }
        }
    }
    return "Không có mảng con thỏa mãn";
}

let input = prompt("Nhập mảng số nguyên, cách nhau bằng dấu phẩy:");
let arr = input.split(',').map(Number);
let target = parseInt(prompt("Nhập số cần tìm tổng:"));

console.log(`Mảng đã nhập: ` + arr.join(' '));
console.log(`Mảng con có tổng bằng ${target}: `);
console.log(findSubarrayWithSum(arr, target));