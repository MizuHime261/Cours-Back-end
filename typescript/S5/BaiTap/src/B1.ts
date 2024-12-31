class Person {
    protected _id: number;
    protected _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    getName(): string {
        return this._name;
    }

    getId(): number {
        return this._id;
    }
}

class Employee extends Person {
    protected _role: string;

    constructor(id: number, name: string, role: string) {
        super(id, name);
        this._role = role;
    }

    getRole(): string {
        return this._role;
    }
}

class Manager extends Employee {
    private _department: string;

    constructor(id: number, name: string, role: string, department: string) {
        super(id, name, role);
        this._department = department;
    }

    getDepartment(): string {
        return this._department;
    }
}

class Task {
    private static _idCounter = 1;
    private _id: number;
    private _title: string;
    private _deadline: Date;
    private _isCompleted: boolean;

    constructor(title: string, deadline: Date) {
        this._id = Task._idCounter++;
        this._title = title;
        this._deadline = deadline;
        this._isCompleted = false;
    }

    complete(): void {
        this._isCompleted = true;
    }

    getDetails(): string {
        return `ID: ${this._id}\n
                Title: ${this._title}\n
                Deadline: ${this._deadline.toDateString()}\n
                Status: ${this._isCompleted ? 'Completed' : 'Pending'}`;
    }

    getId(): number {
        return this._id;
    }
}

class Assignment {
    private _employee: Employee;
    private _task: Task;

    constructor(employee: Employee, task: Task) {
        this._employee = employee;
        this._task = task;
    }

    getAssignmentDetails(): string {
        return `Employee: ${this._employee.getName()}\n
        Task: ${this._task.getDetails()}`;
    }
}

class TaskManager {
    private static _employeeIdCounter = 1;
    private static _managerIdCounter = 1;

    private _employees: Employee[];
    private _managers: Manager[];
    private _tasks: Task[];
    private _assignments: Assignment[];

    constructor() {
        this._employees = [];
        this._managers = [];
        this._tasks = [];
        this._assignments = [];
    }

    addEmployee(name: string, role: string): void {
        let id = TaskManager._employeeIdCounter++;
        let employee = new Employee(id, name, role);
        this._employees.push(employee);
        console.log(`✅ Added employee: ${name}, Role: ${role}, ID: ${id}`);
    }

    addManager(name: string, role: string, department: string): void {
        let id = TaskManager._managerIdCounter++;
        let manager = new Manager(id, name, role, department);
        this._managers.push(manager);
        console.log(`✅ Added manager: ${name}, Role: ${role}, Department: ${department}, ID: ${id}`);
    }

    addTask(title: string, deadline: string): void {
        let parsedDeadline = new Date(deadline);
        if (isNaN(parsedDeadline.getTime())) {
            console.log("⚠️ Invalid date format.");
            return;
        }
        const task = new Task(title, parsedDeadline);
        this._tasks.push(task);
        console.log(`✅ Added task: ${title}, Deadline: ${parsedDeadline.toLocaleDateString()}`);
    }

    assignTask(employeeId: number, taskId: number): void {
        const employee = this._employees.find(e => e.getId() === employeeId);
        const task = this._tasks.find(t => t.getId() === taskId);

        if (!employee) {
            console.log("⚠️ Employee not found.");
            return;
        }

        if (!task) {
            console.log("⚠️ Task not found.");
            return;
        }

        this._assignments.push(new Assignment(employee, task));
        console.log(`✅ Assigned task ID: ${taskId} to employee ID: ${employeeId}`);
    }

    completeTask(taskId: number): void {
        const task = this._tasks.find(t => t.getId() === taskId);
        if (!task) {
            console.log("⚠️ Task not found.");
            return;
        }
        task.complete();
        console.log(`✅ Task ID: ${taskId} marked as complete.`);
    }

    listTasks(): void {
        if (this._tasks.length === 0) {
            console.log("📋 No tasks available.");
            return;
        }
        this._tasks.forEach(task => {
            console.log(task.getDetails());
        });
    }

    listAssignments(): void {
        if (this._assignments.length === 0) {
            console.log("📋 No assignments.");
            return;
        }
        this._assignments.forEach(assignment => {
            console.log(assignment.getAssignmentDetails());
        });
    }
}

class Main1 {
    private _manager: TaskManager;

    constructor() {
        this._manager = new TaskManager();
    }

    start(): void {
        let running = true;
        while (running) {
            const choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm nhân viên mới\n" +
                "2. Thêm công việc mới\n" +
                "3. Gán công việc cho nhân viên\n" +
                "4. Đánh dấu công việc hoàn thành\n" +
                "5. Hiển thị danh sách công việc\n" +
                "6. Dừng chương trình\n"
            );

            switch (choice) {
                case "1":
                    const employeeName = prompt("Nhập tên nhân viên:");
                    const employeeRole = prompt("Nhập vai trò của nhân viên:");
                    if (employeeName && employeeRole) this._manager.addEmployee(employeeName, employeeRole);
                    break;
                case "2":
                    const taskTitle = prompt("Nhập tên công việc:");
                    const taskDeadline = prompt("Nhập hạn hoàn thành (YYYY-MM-DD):");
                    if (taskTitle && taskDeadline) this._manager.addTask(taskTitle, taskDeadline);
                    break;
                case "3":
                    const employeeId = parseInt(prompt("Nhập ID nhân viên:") || "0", 10);
                    const taskId = parseInt(prompt("Nhập ID công việc:") || "0", 10);
                    this._manager.assignTask(employeeId, taskId);
                    break;
                case "4":
                    const completeTaskId = parseInt(prompt("Nhập ID công việc hoàn thành:") || "0", 10);
                    this._manager.completeTask(completeTaskId);
                    break;
                case "5":
                    this._manager.listTasks();
                    break;
                case "6":
                    running = false;
                    console.log("🚪 Đã thoát chương trình.");
                    break;
                default:
                    console.log("⚠️ Lựa chọn không hợp lệ. Vui lòng thử lại.");
            }
        }
    }
}

let app1 = new Main1();
app1.start();