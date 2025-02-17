// Đề bài: Viết chương trình tìm phần tử chung của 3 mảng đã sắp xếp.
function findCommonElements(arr1, arr2, arr3) {
  let i = 0, j = 0, k = 0;
  let result = [];

  while (i < arr1.length && j < arr2.length && k < arr3.length) {
    if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
      result.push(arr1[i]);
      i++;
      j++;
      k++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else if (arr2[j] < arr3[k]) {
      j++;
    } else {
      k++;
    }
  }

  return result.length > 0 ? result : "Không có phần tử chung";
}

function inputArray(index) {
    let input = prompt(`Nhập mảng ${index}, cách nhau bằng dấu phẩy: `);
    let arr = input.split(',').map(Number);
    arr.sort((a, b) => a - b);
    return arr;
}

let arr1 = inputArray(1);
let arr2 = inputArray(2);
let arr3 = inputArray(3);
console.log(`Mảng 1: ` + arr1.join(' '));
console.log(`Mảng 2: ` + arr2.join(' '));
console.log(`Mảng 3: ` + arr3.join(' '));
console.log(`Phần tử chung: ` + findCommonElements(arr1, arr2, arr3));

