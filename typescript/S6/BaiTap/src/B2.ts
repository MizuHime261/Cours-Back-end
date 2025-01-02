class  Person1 {
    private _id: number;
    private _name: string;
    private _email: string;

    constructor(id: number, name: string, email: string) {
        this._id = id;
        this._name = name;
        this._email = email;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }
}

abstract class BankAccount {
    protected _accountId: number;
    protected _owner: Person1;
    protected _balance: number;

    constructor(accountId: number, owner: Person1, initialBalance: number) {
        this._accountId = accountId;
        this._owner = owner;
        this._balance = initialBalance;
    }

    get accountId(): number {
        return this._accountId;
    }

    get owner(): Person1 {
        return this._owner;
    }

    get balance(): number {
        return this._balance;
    }
    
    deposit(amount: number): void {
        this._balance += amount;
        console.log(`✅ Đã nạp ${amount} vào tài khoản. Số dư hiện tại: ${this._balance}.`);
    }

    withdraw(amount: number): void {
        if (amount > this._balance) {
            console.log("⚠️ Không đủ số dư để rút tiền.");
            return;
        }
        this._balance -= amount;
        console.log(`✅ Đã rút ${amount} từ tài khoản. Số dư hiện tại: ${this._balance}.`);
    }

    // Áp dụng lãi suất
    abstract applyInterest(): void;
}

class SavingsAccount extends BankAccount {
    private _interestRate: number;
    private _minimumBalance: number;

    constructor(accountId: number, owner: Person1, balance: number) {
        super(accountId, owner, balance);
        this._interestRate = 0.03;
        this._minimumBalance = 500;
    }


    withdraw(amount: number): void {
        if (this._balance - amount < this._minimumBalance) {
            console.log("⚠️ Số dư không đủ để rút tiền sau khi giữ lại số dư tối thiểu.");
            return;
        }
        super.withdraw(amount);
    }

    applyInterest(): void {
        const interest = this._balance * this._interestRate;
        this._balance += interest;
        console.log(`✅ Đã áp dụng lãi suất. Số dư mới: ${this._balance}.`);
    }
}

class CheckingAccount extends BankAccount {
    applyInterest(): void {
        console.log("⚠️ Tài khoản thanh toán không có lãi suất.");
    }
}

class BusinessAccount extends BankAccount {
    private _interestRate: number;
    private _transactionFee: number;

    constructor(accountId: number, owner: Person1, balance: number){
        super(accountId, owner, balance);
        this._interestRate = 0.01;
        this._transactionFee = 0.02;

    }
    deposit(amount: number): void {
        const fee = amount * this._transactionFee;
        super.deposit(amount - fee);
        console.log(`✅ Đã trừ phí giao dịch ${fee} khi nạp tiền.`);
    }

    withdraw(amount: number): void {
        const fee = amount * this._transactionFee;
        super.withdraw(amount + fee);
        console.log(`✅ Đã trừ phí giao dịch ${fee} khi rút tiền.`);
    }

    applyInterest(): void {
        const interest = this._balance * this._interestRate;
        this._balance += interest;
        console.log(`✅ Đã áp dụng lãi suất. Số dư mới: ${this._balance}.`);
    }
}

class Transaction {
    private static _transactionIdCounter = 1;
    private _transactionId: number;
    private _account: BankAccount;
    private _type: string;
    private _amount: number;
    private _timestamp: Date;

    constructor(account: BankAccount, type: string, amount: number) {
        this._transactionId = Transaction._transactionIdCounter++;
        this._account = account;
        this._type = type;
        this._amount = amount;
        this._timestamp = new Date();
    }

    getDetails(): string {
        return `Giao dịch [ID: ${this._transactionId}, Loại: ${this._type}, Số tiền: ${this._amount}, Thời gian: ${this._timestamp.toLocaleString()}]`;
    }
}

class BankManager {
    private static _customerIdCounter = 1;
    private static _accountIdCounter = 1;

    private _customers: Person1[];
    private _accounts: BankAccount[];
    private _transactions: Transaction[];

    constructor() {
        this._customers = [];
        this._accounts = [];
        this._transactions = [];
    }

    addCustomer(name: string, email: string): void {
        const customer = new Person1(BankManager._customerIdCounter++, name, email);
        this._customers.push(customer);
        console.log(`✅ Đã thêm khách hàng: ${customer.name}`)
    }

    createAccount(customerId: number, type: string): void {
        const customer = this._customers.find(c => c.id === customerId);
        if (!customer) {
            console.log("⚠️ Không tìm thấy khách hàng.");
            return;
        }

        let account: BankAccount;
        switch (type) {
            case "Savings":
                account = new SavingsAccount(BankManager._accountIdCounter++, customer, 0);
                break;
            case "Checking":
                account = new CheckingAccount(BankManager._accountIdCounter++, customer, 0);
                break;
            case "Business":
                account = new BusinessAccount(BankManager._accountIdCounter++, customer, 0);
                break;
            default:
                console.log("⚠️ Loại tài khoản không hợp lệ.");
                return;
        }
        this._accounts.push(account);
        console.log(`✅ Đã tạo tài khoản ${type} cho khách hàng ID: ${customerId}`);
    }

    performTransaction(accountId: number, type: string, amount: number): void {
        const account = this._accounts.find(a => a.accountId === accountId);
        if (!account) {
            console.log("⚠️ Không tìm thấy tài khoản.");
            return;
        }

        switch (type) {
            case "Deposit":
                account.deposit(amount);
                break;
            case "Withdraw":
                account.withdraw(amount);
                break;
            default:
                console.log("⚠️ Loại giao dịch không hợp lệ.");
                return;
        }

        const transaction = new Transaction(account, type, amount);
        this._transactions.push(transaction);
        console.log(`✅ Giao dịch thành công: ${transaction.getDetails()}`);
    }

    applyMonthlyInterest(): void {
        this._accounts.forEach(account => account.applyInterest());
        console.log("✅ Đã áp dụng lãi suất hàng tháng cho tất cả tài khoản.");
    }
}

class Main2 {
    private _manager: BankManager = new BankManager();

    start(): void {
        let running = true;
        while (running) {
            const choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm khách hàng mới\n" +
                "2. Tạo tài khoản\n" +
                "3. Thực hiện giao dịch\n" +
                "4. Áp dụng lãi suất hàng tháng\n" +
                "5. Dừng chương trình\n"
            );

            switch (choice) {
                case "1":
                    const customerName = prompt("Nhập tên khách hàng:");
                    const customerEmail = prompt("Nhập email khách hàng:");
                    if (customerName && customerEmail) this._manager.addCustomer(customerName, customerEmail);
                    break;
                case "2":
                    const customerId = parseInt(prompt("Nhập ID khách hàng:") || "0", 10);
                    const accountType = prompt("Nhập loại tài khoản (Savings/Checking/Business):");
                    if (accountType) this._manager.createAccount(customerId, accountType);
                    break;
                case "3":
                    const accountId = parseInt(prompt("Nhập ID tài khoản:") || "0", 10);
                    const transactionType = prompt("Nhập loại giao dịch (Deposit/Withdraw):");
                    const transactionAmount = parseFloat(prompt("Nhập số tiền giao dịch:") || "0");
                    if (transactionType && transactionAmount > 0) this._manager.performTransaction(accountId, transactionType, transactionAmount);
                    break;
                case "4":
                    this._manager.applyMonthlyInterest();
                    break;
                case "5":
                    running = false;
                    console.log("🚪 Đã thoát chương trình.");
                    break;
                default:
                    console.log("⚠️ Lựa chọn không hợp lệ. Vui lòng thử lại.");
            }
        }
    }
}

const app2 = new Main2();
app2.start();