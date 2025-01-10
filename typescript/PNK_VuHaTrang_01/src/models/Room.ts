export abstract class Room {
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

export class StandardRoom extends Room {
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

export class DeluxeRoom extends Room {
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

export class SuiteRoom extends Room {
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