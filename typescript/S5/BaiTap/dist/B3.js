"use strict";
class Person2 {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
    getName() {
        return this._name;
    }
    getId() {
        return this._id;
    }
}
class Member2 extends Person2 {
    constructor(id, name, membershipType) {
        super(id, name);
        this._membershipType = membershipType;
    }
    getMembershipType() {
        return this._membershipType;
    }
}
class Librarian2 extends Person2 {
    constructor(id, name, position) {
        super(id, name);
        this._position = position;
    }
    getPosition() {
        return this._position;
    }
}
class CD {
    constructor(title, artist) {
        this._id = CD._idCounter++;
        this._title = title;
        this._artist = artist;
        this._isBorrowed = false;
    }
    borrow() {
        this._isBorrowed = true;
    }
    returnCD() {
        this._isBorrowed = false;
    }
    getDetails() {
        return `Mã CD: ${this._id}\nTên CD: ${this._title}\nNghệ sĩ/ban nhạc: ${this._artist}\nTrạng thái: ${this._isBorrowed ? 'Đã mượn' : 'Còn'}`;
    }
    getId() {
        return this._id;
    }
    isBorrowed() {
        return this._isBorrowed;
    }
}
CD._idCounter = 1;
class BorrowRecord2 {
    constructor(member, cd) {
        this._member = member;
        this._cd = cd;
    }
    getRecordDetails() {
        return `Thành viên: ${this._member.getName()} (Mã: ${this._member.getId()})\n` +
            `CD: ${this._cd.getDetails()}`;
    }
}
class LibraryManager2 {
    constructor() {
        this._members = [];
        this._librarians = [];
        this._cds = [];
        this._borrowRecords = [];
    }
    addMember(name, membershipType) {
        let id = LibraryManager2._memberIdCounter++;
        let member2 = new Member2(id, name, membershipType);
        this._members.push(member2);
        console.log(`✅ Thêm thành viên: ${name}, Loại thẻ: ${membershipType}, Mã: ${id}`);
    }
    addLibrarian(name, position) {
        let id = LibraryManager2._librarianIdCounter++;
        let librarian = new Librarian2(id, name, position);
        this._librarians.push(librarian);
        console.log(`✅ Thêm thủ thư: ${name}, Vị trí: ${position}, Mã: ${id}`);
    }
    addCD(title, artist) {
        let id = LibraryManager2._cdIdCounter++;
        let cd = new CD(title, artist);
        this._cds.push(cd);
        console.log(`✅ Thêm CD: ${title} của ${artist}, Mã: ${id}`);
    }
    borrowCD(memberId, cdId) {
        const member = this._members.find(m => m.getId() === memberId);
        const cd = this._cds.find(c => c.getId() === cdId);
        if (!member) {
            console.log("⚠️ Thành viên không tồn tại.");
            return;
        }
        if (!cd) {
            console.log("⚠️ CD không tồn tại.");
            return;
        }
        if (cd.isBorrowed()) {
            console.log("⚠️ CD đã được mượn.");
            return;
        }
        cd.borrow();
        this._borrowRecords.push(new BorrowRecord2(member, cd));
        console.log(`✅ Thành viên ID: ${memberId} đã mượn CD ID: ${cdId}`);
    }
    returnCD(cdId) {
        const cd = this._cds.find(c => c.getId() === cdId);
        if (!cd) {
            console.log("⚠️ CD không tồn tại.");
            return;
        }
        if (!cd.isBorrowed()) {
            console.log("⚠️ CD chưa được mượn.");
            return;
        }
        cd.returnCD();
        console.log(`✅ CD ID: ${cdId} đã được trả lại.`);
    }
    listBorrowRecords() {
        if (this._borrowRecords.length === 0) {
            console.log("📋 Chưa có bản ghi mượn CD.");
            return;
        }
        this._borrowRecords.forEach(record => {
            console.log(record.getRecordDetails());
        });
    }
}
LibraryManager2._memberIdCounter = 1;
LibraryManager2._librarianIdCounter = 1;
LibraryManager2._cdIdCounter = 1;
class Main3 {
    constructor() {
        this._libraryManager = new LibraryManager2();
    }
    start() {
        let running = true;
        while (running) {
            const choice = prompt("Chọn chức năng:\n" +
                "1. Thêm thành viên\n" +
                "2. Thêm thủ thư\n" +
                "3. Thêm CD\n" +
                "4. Mượn CD\n" +
                "5. Trả CD\n" +
                "6. Hiển thị danh sách bản ghi mượn CD\n" +
                "7. Dừng chương trình\n");
            switch (choice) {
                case "1":
                    const memberName = prompt("Nhập tên thành viên:");
                    const membershipType = prompt("Nhập loại thẻ thành viên (VIP, Thường...):");
                    if (memberName && membershipType)
                        this._libraryManager.addMember(memberName, membershipType);
                    break;
                case "2":
                    const librarianName = prompt("Nhập tên thủ thư:");
                    const position = prompt("Nhập vị trí công việc (Quản lý, Nhân viên...):");
                    if (librarianName && position)
                        this._libraryManager.addLibrarian(librarianName, position);
                    break;
                case "3":
                    const cdTitle = prompt("Nhập tên CD:");
                    const cdArtist = prompt("Nhập nghệ sĩ/ban nhạc:");
                    if (cdTitle && cdArtist)
                        this._libraryManager.addCD(cdTitle, cdArtist);
                    break;
                case "4":
                    const borrowMemberId = parseInt(prompt("Nhập ID thành viên mượn CD:") || "0", 10);
                    const borrowCDId = parseInt(prompt("Nhập ID CD mượn:") || "0", 10);
                    this._libraryManager.borrowCD(borrowMemberId, borrowCDId);
                    break;
                case "5":
                    const returnCDId = parseInt(prompt("Nhập ID CD trả:") || "0", 10);
                    this._libraryManager.returnCD(returnCDId);
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
let app3 = new Main3();
app3.start();
