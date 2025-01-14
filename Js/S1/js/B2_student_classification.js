function xepLoai(dtb) {
    if (dtb >= 8.0 && dtb <= 10)
        return "Giỏi";
    if (dtb >= 6.5 && dtb <= 7.9)
        return "Khá";
    if (dtb >= 5.0 && dtb <= 6.4)
        return "Trung bình";
    if (dtb < 5.0)
        return "Yếu";
}

function tinhDiemTrungBinh(toan, van, anh) {
    return (toan + van + anh) / 3;
}

function kiemTraDiem(diem) {
    return diem >= 0 && diem <= 10;
}

function nhapDiem(mon) {
    let diem = parseFloat(document.getElementById(mon).value);
    if (!kiemTraDiem(diem)) {
        return false; 
    }
    return diem; 
}

function tinhXepLoai() {
    let toan = nhapDiem("toan");
    let van = nhapDiem("van");
    let anh = nhapDiem("anh");

    let errorMessages = [];
    if (toan === false) errorMessages.push("Điểm Toán không hợp lệ. Điểm phải từ 0 đến 10.");
    if (van === false) errorMessages.push("Điểm Văn không hợp lệ. Điểm phải từ 0 đến 10.");
    if (anh === false) errorMessages.push("Điểm Anh không hợp lệ. Điểm phải từ 0 đến 10.");

    if (errorMessages.length > 0) {
        alert(errorMessages.join("\n"));
        return; 
    }

    let diemtb = tinhDiemTrungBinh(toan, van, anh);
    let loai = xepLoai(diemtb);
    

    document.getElementById("result").innerHTML = `Điểm trung bình: ${diemtb.toFixed(2)}<br>Xếp loại: ${loai}`;
}