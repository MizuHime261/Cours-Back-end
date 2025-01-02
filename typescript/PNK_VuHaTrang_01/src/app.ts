class Person {
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

    getId(): number {
        return this._id;
    }

    getName(): string {
        return this._name;
    }

    getDetails(): string {
        return `Khách hàng [ID: ${this._id}, Tên: ${this._name}, Email: ${this._email}, SĐT: ${this._phone}]`;
    }
}

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

    getRoomId(): number {
        return this._roomId;
    }

    getRoomType(): string {
        return this._type;
    }

    getPricePerNight(): number {
        return this._pricePerNight;
    }

    isAvailable(): boolean {
        return this._isAvailable;
    }

    bookRoom(): void {
        if (!this._isAvailable) {
            console.log("Phòng đã được đặt trước đó.");
            return;
        }
        this._isAvailable = false;
        console.log(`Phòng ${this._roomId} đã được đặt.`);
    }

    releaseRoom(): void {
        if (this._isAvailable) {
            console.log("Phòng đã trống.");
            return;
        }
        this._isAvailable = true;
        console.log(`Phòng ${this._roomId} đã được trả.`);
    }

    abstract calculateCost(nights: number): number;
    abstract getAdditionalServices(): string[];
    abstract applyDiscount(discountRate: number): number;
    abstract getCancellationPolicy(): string;
}

class StandardRoom extends Room {
    constructor(roomId: number, pricePerNight: number) {
        super(roomId, "Standard", pricePerNight);
    }

    calculateCost(nights: number): number {
        return nights * this._pricePerNight;
    }

    getAdditionalServices(): string[] {
        return ["Không có"];
    }

    applyDiscount(discountRate: number): number {
        return this._pricePerNight * (1 - discountRate / 100);
    }

    getCancellationPolicy(): string {
        return "Hoàn lại 100% nếu hủy trước 1 ngày.";
    }
}

class DeluxeRoom extends Room {
    constructor(roomId: number, pricePerNight: number) {
        super(roomId, "Deluxe", pricePerNight);
    }

    calculateCost(nights: number): number {
        return nights * this._pricePerNight + 20 * nights;
    }

    getAdditionalServices(): string[] {
        return ["Ăn sáng"];
    }

    applyDiscount(discountRate: number): number {
        return this._pricePerNight * (1 - discountRate / 100);
    }

    getCancellationPolicy(): string {
        return "Hoàn lại 50% nếu hủy trước 2 ngày.";
    }
}

class SuiteRoom extends Room {
    constructor(roomId: number, pricePerNight: number) {
        super(roomId, "Suite", pricePerNight);
    }

    calculateCost(nights: number): number {
        return nights * this._pricePerNight + 50 * nights;
    }

    getAdditionalServices(): string[] {
        return ["Spa", "Minibar"];
    }

    applyDiscount(discountRate: number): number {
        return this._pricePerNight * (1 - discountRate / 100);
    }

    getCancellationPolicy(): string {
        return "Không hoàn lại tiền nếu hủy.";
    }
}

class Booking {
    private static _bookingIdCounter = 1;
    private _bookingId: number;
    private _customer: Person;
    private _room: Room;
    private _nights: number;
    private _totalCost: number;

    constructor(customer: Person, room: Room, nights: number) {
        this._bookingId = Booking._bookingIdCounter++;
        this._customer = customer;
        this._room = room;
        this._nights = nights;
        this._totalCost = room.calculateCost(nights);
    }

    getDetails(): string {
        return `Đặt phòng [ID: ${this._bookingId}, Khách hàng: ${this._customer.getName()}, Phòng: ${this._room.getRoomType()}, Số đêm: ${this._nights}, Tổng chi phí: ${this._totalCost}]`;
    }

    getTotalCost(): number {
        return this._totalCost;
    }

    getRoom(): Room {
        return this._room;
    }
}

class HotelManager {
    private _rooms: Room[] = [];
    private _bookings: Booking[] = [];
    private _customers: Person[] = [];

    private static _customerIdCounter = 1;
    private static _roomIdCounter = 1;

    constructor() {
        this._rooms = [];
        this._bookings = [];
        this._customers = [];
    }

    addRoom(type: string, pricePerNight: number): void {
        let room: Room;

        const standardPrice = this._rooms
            .filter(r => r.getRoomType() === "Standard")
            .map(r => r.getPricePerNight());
        const deluxePrice = this._rooms
            .filter(r => r.getRoomType() === "Deluxe")
            .map(r => r.getPricePerNight());
        const suitePrice = this._rooms
            .filter(r => r.getRoomType() === "Suite")
            .map(r => r.getPricePerNight());

        if (
            (type === "Standard" && deluxePrice.some(price => price <= pricePerNight)) ||
            (type === "Deluxe" && (standardPrice.some(price => price >= pricePerNight) || suitePrice.some(price => price <= pricePerNight))) ||
            (type === "Suite" && deluxePrice.some(price => price >= pricePerNight))
        ) {
            console.log("Thêm phòng không hợp lệ. Giá phòng phải theo thứ tự: Standard < Deluxe < Suite.");
            return;
        }
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
                console.log("Loại phòng không hợp lệ.");
                return;
        }
        this._rooms.push(room);
        console.log(`Đã thêm phòng loại ${type} với ID: ${room.getRoomId()}`);
    }

    addCustomer(name: string, email: string, phone: string): Person | null {
        const namePattern = /^[\p{L}\s]+$/u;
        const phonePattern = /^\d{10}$/;
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    
        if (!namePattern.test(name)) {
            console.log("Tên khách hàng không hợp lệ. Tên không được có số.");
            return null;
        }
        if (!phonePattern.test(phone)) {
            console.log("Số điện thoại chỉ có 10 số.");
            return null;
        }
        if (!emailPattern.test(email)) {
            console.log("Email không hợp lệ.");
            return null;
        }
    
        const customer = new Person(HotelManager._customerIdCounter++, name, email, phone);
        this._customers.push(customer);
        console.log(`Đã thêm khách hàng: ${customer.getDetails()}`);
        return customer;
    }    
    
    bookRoom(customerId: number, roomId: number, nights: number): Booking {
        const customer = this._customers.find(c => c.getId() === customerId);
        if (!customer) {
            throw new Error("Không tìm thấy khách hàng.");
        }

        const room = this._rooms.find(r => r.getRoomId() === roomId);
        if (!room || !room.isAvailable()) {
            throw new Error("Phòng không tồn tại hoặc không khả dụng.");
        }

        room.bookRoom();
        const booking = new Booking(customer, room, nights);
        this._bookings.push(booking);
        console.log(`Đặt phòng thành công: ${booking.getDetails()}`);
        return booking;
    }

    releaseRoom(roomId: number): void {
        const room = this._rooms.find(r => r.getRoomId() === roomId);
        if (!room) {
            console.log("Không tìm thấy phòng.");
            return;
        }
        room.releaseRoom();
    }

    listAvailableRooms(): void {
        const availableRooms = this._rooms.filter(r => r.isAvailable());
        if (availableRooms.length === 0) {
            console.log("Không có phòng nào trống.");
            return;
        }
        availableRooms.forEach(r => console.log(`Phòng [ID: ${r.getRoomId()}, Loại: ${r.getRoomType()}, Giá/đêm: ${r.getPricePerNight()}]`));
    }

    listBookingsByCustomer(customerId: number): void {
        const customerBookings = this._bookings.filter(b => b["_customer"].getId() === customerId);
        if (customerBookings.length === 0) {
            console.log("Không có đặt phòng nào của khách hàng này.");
            return;
        }
        customerBookings.forEach(b => console.log(b.getDetails()));
    }

    calculateTotalRevenue(): number {
        return this._bookings.reduce((total, booking) => total + booking.getTotalCost(), 0);
    }

    getRoomTypesCount(): void {
        const roomTypesCount = this._rooms.reduce((count, room) => {
            const roomType = room.getRoomType();
            count[roomType] = (count[roomType] || 0) + 1;
            return count;
        }, {} as { [key: string]: number });
    
        Object.keys(roomTypesCount).map(type => {
            console.log(`${type}: ${roomTypesCount[type]} phòng`);
        });
    }

    applyDiscountToRoom(roomId: number, discountRate: number): void {
        const roomIndex = this._rooms.findIndex(r => r.getRoomId() === roomId);
        if (roomIndex === -1) {
            console.log("Không tìm thấy phòng.");
            return;
        }
        const room = this._rooms[roomIndex];
        const discountedPrice = room.applyDiscount(discountRate);
        console.log(`Giá mới cho phòng ${roomId}: ${discountedPrice}`);
    }

    getRoomServices(roomId: number): void {
        const room = this._rooms.find(r => r.getRoomId() === roomId);
        if (!room) {
            console.log("Không tìm thấy phòng.");
            return;
        }
        console.log(`Dịch vụ bổ sung cho phòng ${roomId}: ${room.getAdditionalServices().join(", ")}`);
    }

    getCancellationPolicy(roomId: number): void {
        const room = this._rooms.find(r => r.getRoomId() === roomId);
        if (!room) {
            console.log("Không tìm thấy phòng.");
            return;
        }
        console.log(`Chính sách hủy cho phòng ${roomId}: ${room.getCancellationPolicy()}`);
    }
}

class Main {
    private _manager: HotelManager = new HotelManager();

    start(): void {
        let running = true;
        while (running) {
            const choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm khách hàng\n" +
                "2. Thêm phòng\n" +
                "3. Đặt phòng\n" +
                "4. Trả phòng\n" +
                "5. Hiển thị danh sách phòng còn trống\n" +
                "6. Hiển thị danh sách đặt phòng của khách hàng\n" +
                "7. Tính tổng doanh thu\n" +
                "8. Đếm số lượng từng loại phòng\n" +
                "9. Áp dụng giảm giá cho phòng\n" +
                "10. Hiển thị các dịch vụ bổ sung của phòng\n" +
                "11. Hiển thị chính sách hủy phòng\n" +
                "12. Thoát chương trình\n"
            );

            switch (choice) {
                case "1":
                    const customerName = prompt("Nhập tên khách hàng:");
                    const customerEmail = prompt("Nhập email khách hàng:");
                    const customerPhone = prompt("Nhập số điện thoại khách hàng:");
                    if (customerName && customerEmail && customerPhone) {
                        this._manager.addCustomer(customerName, customerEmail, customerPhone);
                    } else {
                        console.log("Thông tin khách hàng không hợp lệ.");
                    }
                    break;

                case "2":
                    const roomType = prompt("Nhập loại phòng (Standard/Deluxe/Suite):");
                    const roomPrice = parseFloat(prompt("Nhập giá phòng/đêm:") || "0");
                    if (roomType && roomPrice > 0) {
                        this._manager.addRoom(roomType, roomPrice);
                    } else {
                        console.log("Thông tin phòng không hợp lệ.");
                    }
                    break;

                case "3":
                    const customerId = parseInt(prompt("Nhập ID khách hàng:") || "0", 10);
                    const roomId = parseInt(prompt("Nhập ID phòng:") || "0", 10);
                    const nights = parseInt(prompt("Nhập số đêm lưu trú:") || "0", 10);
                    try {
                        this._manager.bookRoom(customerId, roomId, nights);
                    } catch (error) {
                        if (error instanceof Error) {
                            console.log(`Lỗi: ${error.message}`);
                        } else {
                            console.log("Đã xảy ra lỗi không xác định.");
                        }
                    }
                    break;                    
    
                case "4":
                    const releaseRoomId = parseInt(prompt("Nhập ID phòng cần trả:") || "0", 10);
                    this._manager.releaseRoom(releaseRoomId);
                    break;

                case "5":
                    this._manager.listAvailableRooms();
                    break;

                case "6":
                    const bookingCustomerId = parseInt(prompt("Nhập ID khách hàng:") || "0", 10);
                    this._manager.listBookingsByCustomer(bookingCustomerId);
                    break;

                case "7":
                    const totalRevenue = this._manager.calculateTotalRevenue();
                    console.log(`Tổng doanh thu: ${totalRevenue}`);
                    break;

                case "8":
                    this._manager.getRoomTypesCount();
                    break;

                case "9":
                    const discountRoomId = parseInt(prompt("Nhập ID phòng cần giảm giá:") || "0", 10);
                    const discountRate = parseFloat(prompt("Nhập tỷ lệ giảm giá (%):") || "0");
                    this._manager.applyDiscountToRoom(discountRoomId, discountRate);
                    break;

                case "10":
                    const serviceRoomId = parseInt(prompt("Nhập ID phòng cần xem dịch vụ bổ sung:") || "0", 10);
                    this._manager.getRoomServices(serviceRoomId);
                    break;

                case "11":
                    const policyRoomId = parseInt(prompt("Nhập ID phòng cần xem chính sách hủy:") || "0", 10);
                    this._manager.getCancellationPolicy(policyRoomId);
                    break;

                case "12":
                    running = false;
                    console.log("Đã thoát chương trình.");
                    break;

                default:
                    console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
            }
        }
    }
}

const app = new Main();
app.start();