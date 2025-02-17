// Đề bài: Viết hàm tìm số nhỏ nhất không xuất hiện trong mảng số nguyên dương arr
function findSmallestMissingPositive(arr) {
    let n = arr.length;
    let present = new Array(n + 1).fill(false);

    // Đánh dấu các số xuất hiện trong mảng
    for (let i = 0; i < n; i++) {
        if (arr[i] > 0 && arr[i] <= n) {
            present[arr[i]] = true;
        }
    }

    // Tìm số nhỏ nhất không xuất hiện trong mảng
    for (let i = 1; i <= n; i++) {
        if (!present[i]) {
            return i;
        }
    }

    return n + 1;
}

let input = prompt("Nhập mảng số nguyên, cách nhau bằng dấu phẩy:");
let arr = input.split(',').map(Number);
console.log(`Mảng đã nhập: ` + arr.join(' '));
console.log(`Số nhỏ nhất không xuất hiện trong mảng: ` + findSmallestMissingPositive(arr));