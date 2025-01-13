export function getValidInput(promptMessage, validationFn) {
    let input;
    do {
        input = prompt(promptMessage);
        if (!validationFn(input)) {
            alert("Thông tin không hợp lệ, vui lòng nhập lại.");
        }
    } while (!validationFn(input));
    return input;
}
