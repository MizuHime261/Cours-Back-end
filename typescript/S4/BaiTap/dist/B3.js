"use strict";
class Book {
    constructor(id, title, author, year) {
        this._id = id;
        this._title = title;
        this._author = author;
        this._year = year;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get year() {
        return this._year;
    }
}
class LibraryManager {
    constructor() {
        this._books = [];
    }
    addBook(title, author, year) {
        const id = this._books.length > 0 ? this._books[this._books.length - 1].id + 1 : 1;
        const newBook = new Book(id, title, author, year);
        this._books.push(newBook);
        console.log("📚 Sách đã được thêm vào thư viện.");
    }
    listBooks() {
        if (this._books.length === 0) {
            console.log("⚠️ Thư viện chưa có sách nào.");
        }
        else {
            console.log("📚 Danh sách sách trong thư viện:");
            this._books.forEach(book => {
                console.log(`${book.id}. Tên sách: ${book.title}, Tác giả: ${book.author}, Năm xuất bản: ${book.year}`);
            });
        }
    }
    removeBook(id) {
        const index = this._books.findIndex(book => book.id === id);
        if (index !== -1) {
            this._books.splice(index, 1);
            console.log("📚 Sách đã được xóa khỏi thư viện.");
        }
        else {
            console.log("⚠️ Không tìm thấy sách với mã này.");
        }
    }
    searchBook(title) {
        const foundBooks = this._books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
        if (foundBooks.length > 0) {
            console.log("📚 Kết quả tìm kiếm:");
            foundBooks.forEach(book => {
                console.log(`${book.id}. Tên sách: ${book.title}, Tác giả: ${book.author}, Năm xuất bản: ${book.year}`);
            });
        }
        else {
            console.log("⚠️ Không tìm thấy sách nào với tên này.");
        }
    }
}
class Main3 {
    constructor() {
        this.libraryManager = new LibraryManager();
    }
    start() {
        let running = true;
        while (running) {
            let choice = prompt("Chọn chức năng:\n" +
                "1. Thêm sách vào thư viện\n" +
                "2. Hiển thị danh sách sách\n" +
                "3. Xóa sách theo mã sách\n" +
                "4. Tìm kiếm sách theo tên\n" +
                "5. Dừng chương trình\n");
            switch (choice) {
                case "1": {
                    let title = prompt("Nhập tên sách:");
                    let author = prompt("Nhập tên tác giả:");
                    let year = Number(prompt("Nhập năm xuất bản:"));
                    if (title && author && !isNaN(year)) {
                        this.libraryManager.addBook(title, author, year);
                    }
                    else {
                        console.log("⚠️ Thông tin sách không hợp lệ.");
                    }
                    break;
                }
                case "2": {
                    this.libraryManager.listBooks();
                    break;
                }
                case "3": {
                    let id = Number(prompt("Nhập mã sách cần xóa:"));
                    if (!isNaN(id)) {
                        this.libraryManager.removeBook(id);
                    }
                    else {
                        console.log("⚠️ Mã sách không hợp lệ.");
                    }
                    break;
                }
                case "4": {
                    let title = prompt("Nhập tên sách cần tìm:");
                    if (title) {
                        this.libraryManager.searchBook(title);
                    }
                    else {
                        console.log("⚠️ Tên sách không hợp lệ.");
                    }
                    break;
                }
                case "5": {
                    running = false;
                    console.log("🚪 Đã thoát chương trình.");
                    break;
                }
                default: {
                    console.log("⚠️ Lựa chọn không hợp lệ. Vui lòng thử lại.");
                }
            }
        }
    }
}
let app3 = new Main3();
app3.start();
