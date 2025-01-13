export function getValidInput(promptMessage: string, validationFn: (input: string) => boolean): string {
    let input: string;
    do {
        input = prompt(promptMessage)!;
        if (!validationFn(input)) {
            alert("Thông tin không hợp lệ, vui lòng nhập lại.");
        }
    } while (!validationFn(input));
    return input;
}
