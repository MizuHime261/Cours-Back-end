document.addEventListener("DOMContentLoaded", function () {
    // Lấy ID từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const questionId = urlParams.get("id");

    if (!questionId) {
        console.error("❌ Lỗi: Không tìm thấy ID câu hỏi trong URL.");
        document.querySelector(".question-content").textContent = "Lỗi: Không tìm thấy ID câu hỏi.";
        return;
    }

    const apiUrl = `http://localhost:3000/api/v1/questions/${questionId}`;

    // Chọn các phần tử HTML
    const questionContent = document.querySelector(".question-content");
    const likeBar = document.querySelector(".rate-bar .like");
    const dislikeBar = document.querySelector(".rate-bar .dislike");
    const backButton = document.getElementById("btn");

    // Hàm lấy thông tin câu hỏi từ API
    function loadQuestionDetail() {
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) throw new Error("❌ Không tìm thấy câu hỏi trong API");
                return res.json();
            })
            .then(question => {
                if (!question || !question.content) {
                    questionContent.textContent = "❌ Câu hỏi không tồn tại.";
                    return;
                }
    
                // Gán nội dung câu hỏi vào div.question-content
                questionContent.textContent = question.content;
    
                // Tính toán tỷ lệ like/dislike
                const totalVotes = question.like + question.dislike;
                const likePercentage = totalVotes ? (question.like / totalVotes) * 100 : 50;
                const dislikePercentage = 100 - likePercentage;
    
                // Cập nhật thanh rate bar
                likeBar.style.width = `${likePercentage}%`;
                dislikeBar.style.width = `${dislikePercentage}%`;
    
                // Hiển thị số % trên thanh rate bar
                likeBar.textContent = `${Math.round(likePercentage)}% Like`;
                dislikeBar.textContent = `${Math.round(dislikePercentage)}% Dislike`;
    
                // **Cập nhật số vote**
                const voteNumber = document.querySelector(".vote-number");
                voteNumber.textContent = totalVotes;
            })
            .catch(err => {
                console.error("❌ Lỗi khi tải câu hỏi:", err);
                questionContent.textContent = "❌ Không thể tải dữ liệu.";
            });
    }
    

    // Gắn sự kiện cho nút quay lại trang chủ
    backButton.onclick = function () {
        window.location.href = "/";
    };

    

    // Gọi hàm để tải câu hỏi chi tiết
    loadQuestionDetail();
});