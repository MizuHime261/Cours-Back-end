function kiemTraNamNhuan(year) {
  return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

function ngayThang(month, year) {
  if (month < 1 || month > 12) {
      return "Tháng không hợp lệ!";
  }

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
      if (year <= 0) {
          return "Năm không hợp lệ!";
      }
      if (kiemTraNamNhuan(year)) {
          return 29;
      }
      return 28;
  }
  return daysInMonth[month - 1]; // Return the days for other months
}

function tinhNgay() {
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;

  
  if (month <= 0 || month > 12) {
      document.getElementById("result").innerHTML = "Tháng không hợp lệ. Vui lòng nhập lại từ 1 đến 12.";
      return; 
  }

  
  if (year <= 0) {
      document.getElementById("result").innerHTML = "Năm không hợp lệ. Năm phải lớn hơn 0.";
      return;
  }

  if(month <= 0 || month > 12 && year <= 0) {
      document.getElementById("result").innerHTML = "Tháng không hợp lệ. Vui lòng nhập lại từ 1 đến 12.";
      document.getElementById("result").innerHTML = "Năm không hợp lệ. Năm phải lớn hơn 0.";
      return;
  }


  let day = ngayThang(month, year);
  if (day === "Tháng không hợp lệ!" || day === "Năm không hợp lệ!") {
      document.getElementById("result").innerHTML = day;
  } else {
      document.getElementById("result").innerHTML = "Số ngày trong tháng " + month + " là: " + day;
  }
}