// Lớp Person3 (Người)
class Person3 {
    protected _id: number;
    protected _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    getName(): string {
        return this._name;
    }
}

// Lớp Customer (Khách hàng)
class Customer extends Person3 {
    private _email: string;
    private _phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        super(id, name);
        this._email = email;
        this._phone = phone;
    }

    getContactDetails(): string {
        return `Email: ${this._email}, Phone: ${this._phone}`;
    }
}

// Lớp Employee4 (Nhân viên)
class Employee4 extends Person3 {
    private _position: string;

    constructor(id: number, name: string, position: string) {
        super(id, name);
        this._position = position;
    }

    getPosition(): string {
        return this._position;
    }
}

// Lớp Product (Sản phẩm)
class Product {
    private _id: number;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: number, name: string, price: number, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    sell(quantity: number): boolean {
        if (this._quantity >= quantity) {
            this._quantity -= quantity;
            return true;
        }
        return false;
    }

    restock(quantity: number): void {
        this._quantity += quantity;
    }

    getDetails(): string {
        return `Mã sản phẩm: ${this._id}, Tên sản phẩm: ${this._name}, Giá: ${this._price}, Số lượng: ${this._quantity}`;
    }

    getId(): number {
        return this._id;
    }
}

// Lớp Invoice (Hóa đơn mua hàng)
class Invoice {
    private _customer: Customer;
    private _employee: Employee4;
    private _products: { product: Product, quantity: number }[];
    private _totalAmount: number;

    constructor(customer: Customer, employee: Employee4, products: { product: Product, quantity: number }[]) {
        this._customer = customer;
        this._employee = employee;
        this._products = products;
        this._totalAmount = this.calculateTotal();
    }

    calculateTotal(): number {
        return this._products.reduce((total, item) => total + (item.product['_price'] * item.quantity), 0);
    }

    getInvoiceDetails(): string {
        let details = `Hóa đơn cho khách hàng ${this._customer.getName()} (ID: ${this._customer['_id']})\n`;
        details += `Nhân viên xử lý: ${this._employee.getName()} (Vị trí: ${this._employee.getPosition()})\n`;
        details += "Sản phẩm mua:\n";
        this._products.forEach(item => {
            details += `- ${item.product['_name']} (x${item.quantity})\n`;
        });
        details += `Tổng tiền: ${this._totalAmount}\n`;
        return details;
    }
}

// Lớp StoreManager (Quản lý cửa hàng)
class StoreManager {
    private static _customerIdCounter = 1;
    private static _employeeIdCounter = 1;
    private static _productIdCounter = 1;

    private _customers: Customer[] = [];
    private _employees: Employee4[] = [];
    private _products: Product[] = [];
    private _invoices: Invoice[] = [];

    addCustomer(name: string, email: string, phone: string): void {
        const customer = new Customer(StoreManager._customerIdCounter++, name, email, phone);
        this._customers.push(customer);
        console.log(`✅ Thêm khách hàng: ${name}`);
    }

    addEmployee(name: string, position: string): void {
        const employee = new Employee4(StoreManager._employeeIdCounter++, name, position);
        this._employees.push(employee);
        console.log(`✅ Thêm nhân viên: ${name}`);
    }

    addProduct(name: string, price: number, quantity: number): void {
        const product = new Product(StoreManager._productIdCounter++, name, price, quantity);
        this._products.push(product);
        console.log(`✅ Thêm sản phẩm: ${name}`);
    }

    sellProduct(customerId: number, employeeId: number, productId: number, quantity: number): void {
        const customer = this._customers.find(c => c['_id'] === customerId);
        const employee = this._employees.find(e => e['_id'] === employeeId);
        const product = this._products.find(p => p.getId() === productId);

        if (!customer) {
            console.log("⚠️ Khách hàng không tồn tại.");
            return;
        }

        if (!employee) {
            console.log("⚠️ Nhân viên không tồn tại.");
            return;
        }

        if (!product) {
            console.log("⚠️ Sản phẩm không tồn tại.");
            return;
        }

        if (!product.sell(quantity)) {
            console.log("⚠️ Không đủ sản phẩm trong kho.");
            return;
        }

        const invoice = new Invoice(customer, employee, [{ product, quantity }]);
        this._invoices.push(invoice);
        console.log(`✅ Đã tạo hóa đơn cho khách hàng ${customer.getName()}.`);
    }

    restockProduct(productId: number, quantity: number): void {
        const product = this._products.find(p => p.getId() === productId);

        if (!product) {
            console.log("⚠️ Sản phẩm không tồn tại.");
            return;
        }

        product.restock(quantity);
        console.log(`✅ Đã nhập hàng cho sản phẩm ${product['_name']}.`);
    }

    listInvoices(): void {
        if (this._invoices.length === 0) {
            console.log("⚠️ Chưa có hóa đơn.");
            return;
        }
        this._invoices.forEach(invoice => {
            console.log(invoice.getInvoiceDetails());
        });
    }
}

// Lớp Main (Chương trình chính)
class Main4 {
    private _storeManager: StoreManager;

    constructor() {
        this._storeManager = new StoreManager();
    }

    start(): void {
        let running = true;
        while (running) {
            const choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm khách hàng\n" +
                "2. Thêm nhân viên\n" +
                "3. Thêm sản phẩm\n" +
                "4. Bán hàng (Tạo hóa đơn)\n" +
                "5. Nhập hàng bổ sung\n" +
                "6. Hiển thị danh sách hóa đơn\n" +
                "7. Dừng chương trình\n"
            );

            switch (choice) {
                case "1":
                    const customerName = prompt("Nhập tên khách hàng:");
                    const email = prompt("Nhập email khách hàng:");
                    const phone = prompt("Nhập số điện thoại khách hàng:");
                    if (customerName && email && phone) this._storeManager.addCustomer(customerName, email, phone);
                    break;
                case "2":
                    const employeeName = prompt("Nhập tên nhân viên:");
                    const position = prompt("Nhập vị trí công việc:");
                    if (employeeName && position) this._storeManager.addEmployee(employeeName, position);
                    break;
                case "3":
                    const productName = prompt("Nhập tên sản phẩm:");
                    const price = parseFloat(prompt("Nhập giá sản phẩm:") || "0");
                    const quantity = parseInt(prompt("Nhập số lượng sản phẩm:") || "0", 10);
                    if (productName && price && quantity) this._storeManager.addProduct(productName, price, quantity);
                    break;
                case "4":
                    const customerId = parseInt(prompt("Nhập ID khách hàng:") || "0", 10);
                    const employeeId = parseInt(prompt("Nhập ID nhân viên:") || "0", 10);
                    const productId = parseInt(prompt("Nhập ID sản phẩm:") || "0", 10);
                    const quantityToSell = parseInt(prompt("Nhập số lượng bán:") || "0", 10);
                    this._storeManager.sellProduct(customerId, employeeId, productId, quantityToSell);
                    break;
                case "5":
                    const productRestockId = parseInt(prompt("Nhập ID sản phẩm nhập hàng:") || "0", 10);
                    const restockQuantity = parseInt(prompt("Nhập số lượng nhập:") || "0", 10);
                    this._storeManager.restockProduct(productRestockId, restockQuantity);
                    break;
                case "6":
                    this._storeManager.listInvoices();
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

let app4 = new Main4();
app4.start();