abstract class Room {
    protected _roomId: number;
    protected _type: string;
    protected _pricePerNight: number;
    protected _isAvailable: boolean;

    constructor(roomId: number, type: string, pricePerNight: number) {
        this._roomId = roomId;
        this._type = type;
        this._pricePerNight = pricePerNight;
        this._isAvailable = true;
    }

    get roomId(): number {
        return this._roomId;
    }

    get roomType(): string {
        return this._type;
    }

    get pricePerNight(): number {
        return this._pricePerNight;
    }

    get isAvailable(): boolean {
        return this._isAvailable;
    }

    bookRoom(): void {
        if (!this._isAvailable) {
            console.log("⚠️ Phòng đã được đặt trước đó.");
            return;
        }
        this._isAvailable = false;
        console.log(`✅ Phòng ${this._roomId} đã được đặt.`);
    }

    releaseRoom(): void {
        if (this._isAvailable) {
            console.log("⚠️ Phòng đã trống.");
            return;
        }
        this._isAvailable = true;
        console.log(`✅ Phòng ${this._roomId} đã được trả.`);
    }

    abstract calculateCost(nights: number): number;
}

class StandardRoom extends Room {
    constructor(roomId: number, pricePerNight: number) {
        super(roomId, "Standard", pricePerNight);
    }

    calculateCost(nights: number): number {
        return nights * this._pricePerNight;
    }
}

class DeluxeRoom extends Room {
    constructor(roomId: number, pricePerNight: number) {
        super(roomId, "Deluxe", pricePerNight);
    }

    calculateCost(nights: number): number {
        return nights * this._pricePerNight + 20 * nights; // Thêm chi phí dịch vụ ăn sáng
    }
}

class SuiteRoom extends Room {
    constructor(roomId: number, pricePerNight: number) {
        super(roomId, "Suite", pricePerNight);
    }

    calculateCost(nights: number): number {
        return nights * this._pricePerNight + 50 * nights; // Thêm chi phí dịch vụ spa
    }
}

class Person2 {
    private _id: number;
    private _name: string;
    private _email: string;
    private _phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    getDetails(): string {
        return `Khách hàng [ID: ${this._id}, Tên: ${this._name}, Email: ${this._email}, SĐT: ${this._phone}]`;
    }
}

class Booking {
    private static _bookingIdCounter = 1;
    private _bookingId: number;
    private _customer: Person2;
    private _room: Room;
    private _nights: number;
    private _totalCost: number;

    constructor(customer: Person2, room: Room, nights: number) {
        this._bookingId = Booking._bookingIdCounter++;
        this._customer = customer;
        this._room = room;
        this._nights = nights;
        this._totalCost = room.calculateCost(nights);
    }

    getDetails(): string {
        return `Đặt phòng [ID: ${this._bookingId}, Khách hàng: ${this._customer.name}, Phòng: ${this._room.roomType}, Số đêm: ${this._nights}, Tổng chi phí: ${this._totalCost}]`;
    }
}

class HotelManager {
    private _rooms: Room[];
    private _customers: Person2[];
    private _bookings: Booking[];

    private static _customerIdCounter = 1;
    private static _roomIdCounter = 1;

    constructor() {
        this._rooms = [];
        this._customers = [];
        this._bookings = [];
    }

    addRoom(type: string, pricePerNight: number): void {
        let room: Room;
        switch (type) {
            case "Standard":
                room = new StandardRoom(HotelManager._roomIdCounter++, pricePerNight);
                break;
            case "Deluxe":
                room = new DeluxeRoom(HotelManager._roomIdCounter++, pricePerNight);
                break;
            case "Suite":
                room = new SuiteRoom(HotelManager._roomIdCounter++, pricePerNight);
                break;
            default:
                console.log("⚠️ Loại phòng không hợp lệ.");
                return;
        }
        this._rooms.push(room);
        console.log(`✅ Đã thêm phòng loại ${type} với ID: ${room.roomId}`);
    }

    addCustomer(name: string, email: string, phone: string): void {
        const customer = new Person2(HotelManager._customerIdCounter++, name, email, phone);
        this._customers.push(customer);
        console.log(`✅ Đã thêm khách hàng: ${customer.getDetails()}`);
    }

    bookRoom(customerId: number, roomId: number, nights: number): void {
        const customer = this._customers.find(c => c.id === customerId);
        if (!customer) {
            console.log("⚠️ Không tìm thấy khách hàng.");
            return;
        }

        const room = this._rooms.find(r => r.roomId === roomId);
        if (!room || !room.isAvailable) {
            console.log("⚠️ Phòng không tồn tại hoặc không khả dụng.");
            return;
        }

        room.bookRoom();
        const booking = new Booking(customer, room, nights);
        this._bookings.push(booking);
        console.log(`✅ Đặt phòng thành công: ${booking.getDetails()}`);
    }

    releaseRoom(roomId: number): void {
        const room = this._rooms.find(r => r.roomId === roomId);
        if (!room) {
            console.log("⚠️ Không tìm thấy phòng.");
            return;
        }
        room.releaseRoom();
    }

    listAvailableRooms(): void {
        const availableRooms = this._rooms.filter(r => r.isAvailable);
        if (availableRooms.length === 0) {
            console.log("📋 Không có phòng nào trống.");
            return;
        }
        availableRooms.forEach(r => console.log(`Phòng [ID: ${r.roomId}, Loại: ${r.roomType}, Giá/đêm: ${r.pricePerNight}]`));
    }

    listBookings(): void {
        if (this._bookings.length === 0) {
            console.log("📋 Không có đặt phòng nào.");
            return;
        }
        this._bookings.forEach(booking => console.log(booking.getDetails()));
    }
}

class Main3 {
    private _manager: HotelManager = new HotelManager();

    start(): void {
        let running = true;
        while (running) {
            const choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm phòng mới\n" +
                "2. Thêm khách hàng mới\n" +
                "3. Đặt phòng cho khách hàng\n" +
                "4. Trả phòng\n" +
                "5. Hiển thị danh sách phòng trống\n" +
                "6. Hiển thị danh sách đặt phòng\n" +
                "7. Dừng chương trình\n"
            );

            switch (choice) {
                case "1":
                    const roomType = prompt("Nhập loại phòng (Standard/Deluxe/Suite):");
                    const roomPrice = parseFloat(prompt("Nhập giá phòng/đêm:") || "0");
                    if (roomType && roomPrice) {
                        this._manager.addRoom(roomType, roomPrice);
                    }
                    break;
                case "2":
                    const customerName = prompt("Nhập tên khách hàng:");
                    const customerEmail = prompt("Nhập email khách hàng:");
                    const customerPhone = prompt("Nhập số điện thoại khách hàng:");
                    if (customerName && customerEmail && customerPhone) {
                        this._manager.addCustomer(customerName, customerEmail, customerPhone);
                    }
                    break;
                case "3":
                    const customerId = parseInt(prompt("Nhập ID khách hàng:") || "0", 10);
                    const roomId = parseInt(prompt("Nhập ID phòng:") || "0", 10);
                    const nights = parseInt(prompt("Nhập số đêm lưu trú:") || "0", 10);
                    this._manager.bookRoom(customerId, roomId, nights);
                    break;
                case "4":
                    const releaseRoomId = parseInt(prompt("Nhập ID phòng cần trả:") || "0", 10);
                    this._manager.releaseRoom(releaseRoomId);
                    break;
                case "5":
                    this._manager.listAvailableRooms();
                    break;
                case "6":
                    this._manager.listBookings();
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

const app3 = new Main3();
app3.start();