import { Person } from "../models/Person.js";
import { Room, StandardRoom, DeluxeRoom, SuiteRoom } from "../models/Room.js";
import { Booking } from "../models/Booking.js";
import { roomTypes } from "../constants/constants.js";


export class HotelManager {
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
            .filter(r => r.getRoomType() === roomTypes[0])
            .map(r => r.getPricePerNight());
        const deluxePrice = this._rooms
            .filter(r => r.getRoomType() === roomTypes[1])
            .map(r => r.getPricePerNight());
        const suitePrice = this._rooms
            .filter(r => r.getRoomType() === roomTypes[2])
            .map(r => r.getPricePerNight());

        if (
            (type === roomTypes[0] && deluxePrice.some(price => price <= pricePerNight)) ||
            (type === roomTypes[1] && (standardPrice.some(price => price >= pricePerNight) || suitePrice.some(price => price <= pricePerNight))) ||
            (type === roomTypes[2] && deluxePrice.some(price => price >= pricePerNight))
        ) {
            console.log("Thêm phòng không hợp lệ. Giá phòng phải theo thứ tự: Standard < Deluxe < Suite.");
            return;
        }
        switch (type) {
            case roomTypes[0]:
                room = new StandardRoom(HotelManager._roomIdCounter++, pricePerNight);
                break;
            case roomTypes[1]:
                room = new DeluxeRoom(HotelManager._roomIdCounter++, pricePerNight);
                break;
            case roomTypes[2]:
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