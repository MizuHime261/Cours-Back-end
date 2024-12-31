class Person2 {
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

class Member2 extends Person2 {
    private _membershipType: string;

    constructor(id: number, name: string, membershipType: string) {
        super(id, name);
        this._membershipType = membershipType;
    }

    getMembershipType(): string {
        return this._membershipType;
    }
}

class Librarian2 extends Person2 {
    private _position: string;

    constructor(id: number, name: string, position: string) {
        super(id, name);
        this._position = position;
    }

    getPosition(): string {
        return this._position;
    }
}

class CD {
    private static _idCounter = 1;
    private _id: number;
    private _title: string;
    private _artist: string;
    private _isBorrowed: boolean;

    constructor(title: string, artist: string) {
        this._id = CD._idCounter++;
        this._title = title;
        this._artist = artist;
        this._isBorrowed = false;
    }

    borrow(): void {
        this._isBorrowed = true;
    }

    returnCD(): void {
        this._isBorrowed = false;
    }

    getDetails(): string {
        return `Mã CD: ${this._id}\nTên CD: ${this._title}\nNghệ sĩ/ban nhạc: ${this._artist}\nTrạng thái: ${this._isBorrowed ? 'Đã mượn' : 'Còn'}`;
    }

    getId(): number {
        return this._id;
    }

    isBorrowed(): boolean {
        return this._isBorrowed;
    }
}

class BorrowRecord2 {
    private _member: Member2;
    private _cd: CD;

    constructor(member: Member2, cd: CD) {
        this._member = member;
        this._cd = cd;
    }

    getRecordDetails(): string {
        return `Thành viên: ${this._member.getName()} (Mã: ${this._member.getId()})\n` +
               `CD: ${this._cd.getDetails()}`;
    }
}

class LibraryManager2 {
    private static _memberIdCounter = 1;
    private static _librarianIdCounter = 1;
    private static _cdIdCounter = 1;

    private _members: Member2[];
    private _librarians: Librarian2[];
    private _cds: CD[];
    private _borrowRecords: BorrowRecord2[];

    constructor(){
        this._members = [];
        this._librarians = [];
        this._cds = [];
        this._borrowRecords = [];
    }

    addMember(name: string, membershipType: string): void {
        let id = LibraryManager2._memberIdCounter++;
        let member2 = new Member2(id, name, membershipType);
        this._members.push(member2);
        console.log(`✅ Thêm thành viên: ${name}, Loại thẻ: ${membershipType}, Mã: ${id}`);
    }

    addLibrarian(name: string, position: string): void {
        let id = LibraryManager2._librarianIdCounter++;
        let librarian = new Librarian2(id, name, position);
        this._librarians.push(librarian);
        console.log(`✅ Thêm thủ thư: ${name}, Vị trí: ${position}, Mã: ${id}`);
    }

    addCD(title: string, artist: string): void {
        let id = LibraryManager2._cdIdCounter++;
        let cd = new CD(title, artist);
        this._cds.push(cd);
        console.log(`✅ Thêm CD: ${title} của ${artist}, Mã: ${id}`);
    }

    borrowCD(memberId: number, cdId: number): void {
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

    returnCD(cdId: number): void {
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

    listBorrowRecords(): void {
        if (this._borrowRecords.length === 0) {
            console.log("📋 Chưa có bản ghi mượn CD.");
            return;
        }
        this._borrowRecords.forEach(record => {
            console.log(record.getRecordDetails());
        });
    }
}

class Main3 {
    private _libraryManager: LibraryManager2;

    constructor() {
        this._libraryManager = new LibraryManager2();
    }

    start(): void {
        let running = true;
        while (running) {
            const choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm thành viên\n" +
                "2. Thêm thủ thư\n" +
                "3. Thêm CD\n" +
                "4. Mượn CD\n" +
                "5. Trả CD\n" +
                "6. Hiển thị danh sách bản ghi mượn CD\n" +
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
                    const cdTitle = prompt("Nhập tên CD:");
                    const cdArtist = prompt("Nhập nghệ sĩ/ban nhạc:");
                    if (cdTitle && cdArtist) this._libraryManager.addCD(cdTitle, cdArtist);
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