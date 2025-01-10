export class Booking {
    constructor(customer, room, nights) {
        this._bookingId = Booking._bookingIdCounter++;
        this._customer = customer;
        this._room = room;
        this._nights = nights;
        this._totalCost = room.calculateCost(nights);
    }
    getDetails() {
        return `Đặt phòng [ID: ${this._bookingId}, Khách hàng: ${this._customer.getName()}, Phòng: ${this._room.getRoomType()}, Số đêm: ${this._nights}, Tổng chi phí: ${this._totalCost}]`;
    }
    getTotalCost() {
        return this._totalCost;
    }
    getRoom() {
        return this._room;
    }
}
Booking._bookingIdCounter = 1;
