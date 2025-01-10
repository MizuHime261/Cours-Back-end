import { HotelManager } from "./services/HotelManager.js";

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
