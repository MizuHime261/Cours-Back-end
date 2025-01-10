export class Room {
    constructor(roomId, type, pricePerNight) {
        this._roomId = roomId;
        this._type = type;
        this._pricePerNight = pricePerNight;
        this._isAvailable = true;
    }
    getRoomId() {
        return this._roomId;
    }
    getRoomType() {
        return this._type;
    }
    getPricePerNight() {
        return this._pricePerNight;
    }
    isAvailable() {
        return this._isAvailable;
    }
    bookRoom() {
        if (!this._isAvailable) {
            console.log("Phòng đã được đặt trước đó.");
            return;
        }
        this._isAvailable = false;
        console.log(`Phòng ${this._roomId} đã được đặt.`);
    }
    releaseRoom() {
        if (this._isAvailable) {
            console.log("Phòng đã trống.");
            return;
        }
        this._isAvailable = true;
        console.log(`Phòng ${this._roomId} đã được trả.`);
    }
}
export class StandardRoom extends Room {
    constructor(roomId, pricePerNight) {
        super(roomId, "Standard", pricePerNight);
    }
    calculateCost(nights) {
        return nights * this._pricePerNight;
    }
    getAdditionalServices() {
        return ["Không có"];
    }
    applyDiscount(discountRate) {
        return this._pricePerNight * (1 - discountRate / 100);
    }
    getCancellationPolicy() {
        return "Hoàn lại 100% nếu hủy trước 1 ngày.";
    }
}
export class DeluxeRoom extends Room {
    constructor(roomId, pricePerNight) {
        super(roomId, "Deluxe", pricePerNight);
    }
    calculateCost(nights) {
        return nights * this._pricePerNight + 20 * nights;
    }
    getAdditionalServices() {
        return ["Ăn sáng"];
    }
    applyDiscount(discountRate) {
        return this._pricePerNight * (1 - discountRate / 100);
    }
    getCancellationPolicy() {
        return "Hoàn lại 50% nếu hủy trước 2 ngày.";
    }
}
export class SuiteRoom extends Room {
    constructor(roomId, pricePerNight) {
        super(roomId, "Suite", pricePerNight);
    }
    calculateCost(nights) {
        return nights * this._pricePerNight + 50 * nights;
    }
    getAdditionalServices() {
        return ["Spa", "Minibar"];
    }
    applyDiscount(discountRate) {
        return this._pricePerNight * (1 - discountRate / 100);
    }
    getCancellationPolicy() {
        return "Không hoàn lại tiền nếu hủy.";
    }
}
