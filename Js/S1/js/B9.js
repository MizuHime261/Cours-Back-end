function isLeapYear(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

const year = parseInt(prompt("Nhập năm: "));

if (year <= 0) {
    console.log("Năm không hợp lệ. Năm phải lớn hơn 0.");
} else {
    if (isLeapYear(year)) {
        console.log(year + " là năm nhuận.");
    } else {
        console.log(year + " không phải là năm nhuận.");
    }
}