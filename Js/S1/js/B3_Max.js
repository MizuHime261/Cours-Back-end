let arr = [];

// Xử lý sự kiện nhấn Enter trên input nhập số phần tử
function handleArraySizeEnter(event) {
    if (event.key === "Enter") {
        nhapMang();
    }
}

// Tạo các ô nhập mảng
function nhapMang() {
    let n = parseInt(document.getElementById("arraySize").value);

    if (isNaN(n) || n <= 0) {
        document.getElementById("result").innerHTML = "Vui lòng nhập số phần tử hợp lệ (lớn hơn 0).";
        return;
    }

    let inputContainer = document.getElementById("inputArray");
    inputContainer.innerHTML = "";

    arr = [];

    for (let i = 0; i < n; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Phần tử ${i + 1}`;
        input.id = `element-${i}`;

        // Cho phép nhập số thực dạng 3.4, loại bỏ ký tự không hợp lệ
        input.oninput = function () {
            // Chỉ cho phép số, dấu chấm và dấu âm (nếu cần)
            this.value = this.value.replace(/[^0-9.-]/g, '');

            // Chỉ cho phép một dấu chấm duy nhất
            if ((this.value.match(/[.]/g) || []).length > 1) {
                this.value = this.value.slice(0, -1); // Loại bỏ dấu chấm thứ hai nếu có
            }
        };

        // Chuyển đến ô nhập tiếp theo khi nhấn Enter
        input.onkeydown = function (event) {
            if (event.key === "Enter") {
                let nextInput = document.getElementById(`element-${i + 1}`);
                if (nextInput) {
                    nextInput.focus();
                } else {
                    document.getElementById("btnFindMax").focus();
                }
            }
        };

        inputContainer.appendChild(input);
    }

    document.getElementById("btnFindMax").style.display = "block";
    document.getElementById("result").innerHTML = "";

    document.getElementById("element-0").focus();
}

// Tìm giá trị lớn nhất trong mảng
function timMax() {
    let n = document.getElementById("arraySize").value;
    arr = [];

    for (let i = 0; i < n; i++) {
        let value = parseFloat(document.getElementById(`element-${i}`).value);
        if (isNaN(value)) {
            document.getElementById("result").innerHTML = `Phần tử ${i + 1} không hợp lệ. Vui lòng nhập lại!`;
            return;
        }
        arr.push(value);
    }

    if (arr.length === 0) {
        document.getElementById("result").innerHTML = "Mảng rỗng. Không thể tìm số lớn nhất.";
        return;
    }

    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    document.getElementById("result").innerHTML = `Mảng đã nhập: ${arr.join(", ")}<br>Số lớn nhất: ${max}`;
}