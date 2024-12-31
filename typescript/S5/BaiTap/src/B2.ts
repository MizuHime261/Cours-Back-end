class Person1 {
    protected _id: number;
    protected _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    getName(): string {
        return this._name;
    }

    getId(): number {
        return this._id;
    }
}

class Member extends Person1 {
    private _membershipType: string;

    constructor(id: number, name: string, membershipType: string) {
        super(id, name);
        this._membershipType = membershipType;
    }

    getMembershipType(): string {
        return this._membershipType;
    }
}

class Librarian extends Person1 {
    private _position: string;

    constructor(id: number, name: string, position: string) {
        super(id, name);
        this._position = position;
    }

    getPosition(): string {
        return this._position;
    }
}

class Book {
    private static _idCounter = 1;
    private _id: number;
    private _title: string;
    private _author: string;
    private _isBorrowed: boolean;

    constructor(title: string, author: string) {
        this._id = Book._idCounter++;
        this._title = title;
        this._author = author;
        this._isBorrowed = false;
    }

    borrow(): void {
        this._isBorrowed = true;
    }

    returnBook(): void {
        this._isBorrowed = false;
    }

    getDetails(): string {
        return `Mã sách: ${this._id}\nTên sách: ${this._title}\nTác giả: ${this._author}\nTrạng thái: ${this._isBorrowed ? 'Đã mượn' : 'Còn'}`
    }

    getId(): number {
        return this._id;
    }
}

class BorrowRecord {
    private _member: Member;
    private _book: Book;

    constructor(member: Member, book: Book) {
        this._member = member;
        this._book = book;
    }

    getRecordDetails(): string {
        return `Thành viên: ${this._member.getName()} (Mã: ${this._member.getId()})\n` +
               `Sách: ${this._book.getDetails()}`;
    }
}

class LibraryManager {
    private static _memberIdCounter = 1;
    private static _librarianIdCounter = 1;
    private static _bookIdCounter = 1;

    private _members: Member[];
    private _librarians: Librarian[];
    private _books: Book[];
    private _borrowRecords: BorrowRecord[];

    constructor() {
        this._members = [];
        this._librarians = [];
        this._books = [];
        this._borrowRecords = [];
    }

    addMember(name: string, membershipType: string): void {
        let id = LibraryManager._memberIdCounter++;
        let member = new Member(id, name, membershipType);
        this._members.push(member);
        console.log(`✅ Thêm thành viên: ${name}, Loại thẻ: ${membershipType}, Mã: ${id}`);
    }

    addLibrarian(name: string, position: string): void {
        let id = LibraryManager._librarianIdCounter++;
        let librarian = new Librarian(id, name, position);
        this._librarians.push(librarian);
        console.log(`✅ Thêm thủ thư: ${name}, Vị trí: ${position}, Mã: ${id}`);
    }

    addBook(title: string, author: string): void {
        let id = LibraryManager._bookIdCounter++;
        let book = new Book(title, author);
        this._books.push(book);
        console.log(`✅ Thêm sách: ${title} của ${author}, Mã: ${id}`);
    }

    borrowBook(memberId: number, bookId: number): void {
        const member = this._members.find(m => m.getId() === memberId);
        const book = this._books.find(b => b.getId() === bookId);

        if (!member) {
            console.log("⚠️ Thành viên không tồn tại.");
            return;
        }

        if (!book) {
            console.log("⚠️ Sách không tồn tại.");
            return;
        }

        if (book['_isBorrowed']) {
            console.log("⚠️ Sách đã được mượn.");
            return;
        }

        book.borrow();
        this._borrowRecords.push(new BorrowRecord(member, book));
        console.log(`✅ Thành viên ID: ${memberId} đã mượn sách ID: ${bookId}`);
    }

    returnBook(bookId: number): void {
        const book = this._books.find(b => b.getId() === bookId);
        if (!book) {
            console.log("⚠️ Sách không tồn tại.");
            return;
        }

        if (!book['_isBorrowed']) {
            console.log("⚠️ Sách chưa được mượn.");
            return;
        }

        book.returnBook();
        console.log(`✅ Sách ID: ${bookId} đã được trả lại.`);
    }

    listBorrowRecords(): void {
        if (this._borrowRecords.length === 0) {
            console.log("📋 Chưa có bản ghi mượn sách.");
            return;
        }
        this._borrowRecords.forEach(record => {
            console.log(record.getRecordDetails());
        });
    }
}

class Main2 {
    private _libraryManager: LibraryManager;

    constructor() {
        this._libraryManager = new LibraryManager();
    }

    start(): void {
        let running = true;
        while (running) {
            const choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm thành viên\n" +
                "2. Thêm thủ thư\n" +
                "3. Thêm sách\n" +
                "4. Mượn sách\n" +
                "5. Trả sách\n" +
                "6. Hiển thị danh sách bản ghi mượn sách\n" +
                "7. Dừng chương trình\n"
            );

            switch (choice) {
                case "1":
                    const memberName = prompt("Nhập tên thành viên:");
                    const membershipType = prompt("Nhập loại thẻ thành viên (VIP, Thường...):");
                    if (memberName && membershipType) this._libraryManager.addMember(memberName, membershipType);
                    break;
                case "2":
                    const librarianName = prompt("Nhập tên thủ thư:");
                    const position = prompt("Nhập vị trí công việc (Quản lý, Nhân viên...):");
                    if (librarianName && position) this._libraryManager.addLibrarian(librarianName, position);
                    break;
                case "3":
                    const bookTitle = prompt("Nhập tên sách:");
                    const bookAuthor = prompt("Nhập tác giả sách:");
                    if (bookTitle && bookAuthor) this._libraryManager.addBook(bookTitle, bookAuthor);
                    break;
                case "4":
                    const borrowMemberId = parseInt(prompt("Nhập ID thành viên mượn sách:") || "0", 10);
                    const borrowBookId = parseInt(prompt("Nhập ID sách mượn:") || "0", 10);
                    this._libraryManager.borrowBook(borrowMemberId, borrowBookId);
                    break;
                case "5":
                    const returnBookId = parseInt(prompt("Nhập ID sách trả:") || "0", 10);
                    this._libraryManager.returnBook(returnBookId);
                    break;
                case "6":
                    this._libraryManager.listBorrowRecords();
                    break;
                case "7":
                    running = false;
                    console.log("🚪 Đã thoát chương trình.");
                    break;
                default:
                    console.log("⚠️ Lựa chọn không hợp lệ. Vui lòng thử lại.");
            }
        }
    }
}

let app2 = new Main2();
app2.start();