class CD {
    private static _idCounter = 1;
    private _id: number;
    private _title: string;
    private _artist: string;
    private _year: number;

    constructor(title: string, artist: string, year: number) {
        this._id = CD._idCounter++;
        this._title = title;
        this._artist = artist;
        this._year = year;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (!value.trim()) {
            throw new Error("Tên CD không được để trống.");
        }
        this._title = value;
    }

    get artist(): string {
        return this._artist;
    }

    set artist(value: string) {
        if (!value.trim()) {
            throw new Error("Nghệ sĩ không được để trống.");
        }
        this._artist = value;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        if (value < 1900 || value > new Date().getFullYear()) {
            throw new Error("Năm phát hành không hợp lệ.");
        }
        this._year = value;
    }
}

class CDStoreManager {
    private _cds: CD[];

    constructor() {
        this._cds = [];
    }

    addCD(title: string, artist: string, year: number): void {
        const newCD = new CD(title, artist, year);
        this._cds.push(newCD);
        console.log("🎶 CD đã được thêm vào cửa hàng.");
    }

    listCDs(): void {
        if (this._cds.length === 0) {
            console.log("⚠️ Cửa hàng chưa có CD nào.");
        } else {
            console.log("🎶 Danh sách CD trong cửa hàng:");
            this._cds.forEach(cd => {
                console.log(`${cd.id}. Tên CD: ${cd.title}, Nghệ sĩ: ${cd.artist}, Năm phát hành: ${cd.year}`);
            });
        }
    }

    removeCD(id: number): void {
        const index = this._cds.findIndex(cd => cd.id === id);
        if (index !== -1) {
            this._cds.splice(index, 1);
            console.log("🎶 CD đã được xóa khỏi cửa hàng.");
        } else {
            console.log("⚠️ Không tìm thấy CD với mã này.");
        }
    }

    searchCD(title: string): void {
        const foundCDs = this._cds.filter(cd => cd.title.toLowerCase().includes(title.toLowerCase()));
        if (foundCDs.length > 0) {
            console.log("🎶 Kết quả tìm kiếm:");
            foundCDs.forEach(cd => {
                console.log(`${cd.id}. Tên CD: ${cd.title}, Nghệ sĩ: ${cd.artist}, Năm phát hành: ${cd.year}`);
            });
        } else {
            console.log("⚠️ Không tìm thấy CD nào với tên này.");
        }
    }
}

class Main4 {
    private _cdStoreManager: CDStoreManager;

    constructor() {
        this._cdStoreManager = new CDStoreManager();
    }

    start(): void {
        let running = true;

        while (running) {
            let choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm CD vào cửa hàng\n" +
                "2. Hiển thị danh sách CD\n" +
                "3. Xóa CD theo mã CD\n" +
                "4. Tìm kiếm CD theo tên\n" +
                "5. Dừng chương trình\n"
            );

            switch (choice) {
                case "1": {
                    let title = prompt("Nhập tên CD:");
                    let artist = prompt("Nhập nghệ sĩ biểu diễn:");
                    let year = Number(prompt("Nhập năm phát hành:"));
                    if (title && artist && !isNaN(year)) {
                        this._cdStoreManager.addCD(title, artist, year);
                    } else {
                        console.log("⚠️ Thông tin CD không hợp lệ.");
                    }
                    break;
                }
                case "2": {
                    this._cdStoreManager.listCDs();
                    break;
                }
                case "3": {
                    let id = Number(prompt("Nhập mã CD cần xóa:"));
                    if (!isNaN(id)) {
                        this._cdStoreManager.removeCD(id);
                    } else {
                        console.log("⚠️ Mã CD không hợp lệ.");
                    }
                    break;
                }
                case "4": {
                    let title = prompt("Nhập tên CD cần tìm:");
                    if (title) {
                        this._cdStoreManager.searchCD(title);
                    } else {
                        console.log("⚠️ Tên CD không hợp lệ.");
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

let app4 = new Main4();
app4.start();