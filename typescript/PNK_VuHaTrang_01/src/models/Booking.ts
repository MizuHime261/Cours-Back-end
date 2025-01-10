import { Person } from "./Person.js";
import { Room } from "./Room.js";

export class Booking {
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