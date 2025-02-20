document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "http://localhost:3000/api/v1/questions";
    const questionContent = document.querySelector(".question-content");
    const likeButton = document.getElementById("like");
    const dislikeButton = document.getElementById("dislike");

    function loadQuestion() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(questions => {
                if (!questions.length) {
                    questionContent.textContent = "❌ Không có câu hỏi nào.";
                    return;
                }

                // Lấy ngẫu nhiên một câu hỏi
                const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
                questionContent.textContent = randomQuestion.content;

                // Gán sự kiện Like
                likeButton.onclick = () => updateReaction(randomQuestion.id, "like", randomQuestion.like);

                // Gán sự kiện Dislike
                dislikeButton.onclick = () => updateReaction(randomQuestion.id, "dislike", randomQuestion.dislike);
            })
            .catch(err => {
                console.error("❌ Lỗi khi tải danh sách câu hỏi:", err);
                questionContent.textContent = "❌ Không thể tải câu hỏi.";
            });
    }

    function updateReaction(id, type, currentValue) {
        fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [type]: currentValue + 1 })
        })
        .then(() => {
            // Chuyển hướng đến trang chi tiết có ID
            window.location.href = `/question-detail.html?id=${id}`;
        })
        .catch(err => console.error(`❌ Lỗi khi cập nhật ${type}:`, err));
    }

    loadQuestion();
});