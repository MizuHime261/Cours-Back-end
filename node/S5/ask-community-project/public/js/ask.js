document.addEventListener("DOMContentLoaded", function () {
    // Gọi ra các phần tử DOM cần thiết
    const textarea = document.querySelector(".question-content");
    const wordCountSpan = document.querySelector(".letter");
    const form = document.querySelector(".main-form");

    const maxWords = 200; // Giới hạn số từ

    // Sự kiện "input" trên textarea để đếm số từ
    textarea.addEventListener("input", function () {
        let text = textarea.value.trim();
        let words = text.split(/\s+/).filter(word => word.length > 0); // Tách từ và loại bỏ khoảng trắng thừa
        let wordCount = words.length;

        // Giới hạn số từ nhập vào
        if (wordCount > maxWords) {
            words = words.slice(0, maxWords);
            textarea.value = words.join(" "); // Cắt bớt phần nhập thừa
            wordCount = maxWords;
        }

        // Hiển thị số từ lên span.letter
        wordCountSpan.textContent = wordCount;
    });

    // Sự kiện "submit" trên form để validate và gửi dữ liệu
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn form submit mặc định

        let questionContent = textarea.value.trim();

        // Kiểm tra textarea không được để trống
        if (questionContent === "") {
            alert("Textarea không được bỏ trống!");
            return;
        }

        // Gửi dữ liệu đến API
        fetch("http://localhost:3000/api/v1/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: questionContent,
                like: 0,
                dislike: 0
            })
        })
        .then(res => {
            if (!res.ok) throw new Error("Lỗi khi thêm câu hỏi");
            return res.json();
        })
        .then(data => {
            alert("Thêm câu hỏi thành công!");
            window.location.href = "/"; // Điều hướng về trang chủ
        })
        .catch(err => {
            console.error("Lỗi gửi dữ liệu:", err);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        });
    });
});