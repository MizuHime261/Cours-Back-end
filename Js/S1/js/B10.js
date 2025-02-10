function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

let month, year;

// Nhập tháng, yêu cầu nhập lại nếu không hợp lệ
while (true) {
    month = parseInt(prompt("Nhập tháng (1-12):"));
    if (month >= 1 && month <= 12) {
        break; // Thoát vòng lặp nếu nhập đúng
    }
    alert("Tháng không hợp lệ! Vui lòng nhập lại.");
}

// Nhập năm, yêu cầu nhập lại nếu không hợp lệ
while (true) {
    year = parseInt(prompt("Nhập năm (>=1):"));
    if (year >= 1) {
        break; // Thoát vòng lặp nếu nhập đúng
    }
    alert("Năm không hợp lệ! Vui lòng nhập lại.");
}

const days = getDaysInMonth(month, year);
console.log(`Số ngày trong tháng ${month} năm ${year} là: ${days}`);