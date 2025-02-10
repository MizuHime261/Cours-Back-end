const randomNumber = Math.floor(Math.random() * 10) + 1;
let guess;

while (true) {
    guess = parseInt(prompt("Nhập một số từ 1 đến 10:"));

    if (isNaN(guess) || guess < 1 || guess > 10) {
        alert("Vui lòng nhập một số hợp lệ từ 1 đến 10.");
        continue;
    }

    if (guess > randomNumber){
        alert("Số bạn nhập lớn hơn số cần đoán.");
    } else if (guess < randomNumber) {
        alert("Số bạn nhập nhỏ hơn số cần đoán.");
    } else {
        alert("Chính xác! Số cần đoán là " + randomNumber);
        break;
    }
}