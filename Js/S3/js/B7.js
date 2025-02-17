// Đề bài: nhập vào 1 chuỗi bất kỳ, in ra mảng chứa tất cả các chuỗi con trong chuỗi truyền đã nhập.
function getAllSubstrings(str) {
    let result = [];
    for (let i = 0; i< str.length; i++) {
        for (let j = i+1; j <= str.length; j++) {
            result.push(str.slice(i, j));
        }
    }
    return result;
};

let input = prompt('Nhập một chuỗi: ');
console.log(`Chuỗi đã nhập: ` + input);
console.log(`Tất cả các phần tử của chuỗi: ` + getAllSubstrings(input).join(' '));