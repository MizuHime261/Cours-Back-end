"use strict";
class Person {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
}
class Employee extends Person {
    constructor(id, name, role) {
        super(id, name);
        this._role = role;
    }
    get role() {
        return this._role;
    }
    getDetails() {
        return `Nhân viên [ID: ${this.id}, Tên: ${this.name}, Vai trò: ${this.role}]`;
    }
}
class Manager extends Employee {
    constructor(id, name, role, department) {
        super(id, name, role);
        this._department = department;
    }
    get department() {
        return this._department;
    }
    getDetails() {
        return `Quản lý [ID: ${this.id}, Tên: ${this.name}, Vai trò: ${this.role}, Phòng ban: ${this.department}]`;
    }
}
class Task {
    constructor(title, deadline) {
        this._id = Task._idCounter++;
        this._title = title;
        this._deadline = deadline;
        this._isCompleted = false;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get deadline() {
        return this._deadline;
    }
    get isCompleted() {
        return this._isCompleted;
    }
    complete() {
        this._isCompleted = true;
    }
    getDetails() {
        return `Công việc [ID: ${this.id}, Tên: ${this.title}, Hạn chót: ${this.deadline.toDateString()}, Trạng thái: ${this.isCompleted ? 'Hoàn thành' : 'Đang chờ'}]`;
    }
}
Task._idCounter = 1;
class Assignment {
    constructor(employee, task) {
        this._employee = employee;
        this._task = task;
    }
    getDetails() {
        return `Phân công [Nhân viên: ${this._employee.name}, Công việc: ${this._task.title}, Trạng thái: ${this._task.isCompleted ? 'Hoàn thành' : 'Đang chờ'}]`;
    }
}
class TaskManager {
    constructor() {
        this._employees = [];
        this._managers = [];
        this._tasks = [];
        this._assignments = [];
    }
    addEmployee(name, role) {
        const employee = new Employee(TaskManager._employeeIdCounter++, name, role);
        this._employees.push(employee);
        console.log(`✅ Đã thêm ${employee.getDetails()}`);
    }
    addManager(name, role, department) {
        const manager = new Manager(TaskManager._managerIdCounter++, name, role, department);
        this._managers.push(manager);
        console.log(`✅ Đã thêm ${manager.getDetails()}`);
    }
    addTask(title, deadline) {
        const parsedDeadline = new Date(deadline);
        if (isNaN(parsedDeadline.getTime())) {
            console.log("⚠️ Ngày không hợp lệ.");
            return;
        }
        const task = new Task(title, parsedDeadline);
        this._tasks.push(task);
        console.log(`✅ Đã thêm ${task.getDetails()}`);
    }
    assignTask(employeeId, taskId) {
        const employee = this._employees.find(e => e.id === employeeId);
        const task = this._tasks.find(t => t.id === taskId);
        if (!employee) {
            console.log("⚠️ Không tìm thấy nhân viên.");
            return;
        }
        if (!task) {
            console.log("⚠️ Không tìm thấy công việc.");
            return;
        }
        const assignment = new Assignment(employee, task);
        this._assignments.push(assignment);
        console.log(`✅ Đã gán công việc ID: ${taskId} cho nhân viên ID: ${employeeId}`);
    }
    completeTask(taskId) {
        const task = this._tasks.find(t => t.id === taskId);
        if (!task) {
            console.log("⚠️ Không tìm thấy công việc.");
            return;
        }
        task.complete();
        console.log(`✅ Công việc ID: ${taskId} đã được đánh dấu hoàn thành.`);
    }
    listTasks() {
        if (this._tasks.length === 0) {
            console.log("📋 Không có công việc nào.");
            return;
        }
        this._tasks.forEach(task => console.log(task.getDetails()));
    }
    listAssignments() {
        if (this._assignments.length === 0) {
            console.log("📋 Không có phân công nào.");
            return;
        }
        this._assignments.forEach(assignment => console.log(assignment.getDetails()));
    }
}
TaskManager._employeeIdCounter = 1;
TaskManager._managerIdCounter = 1;
class Main1 {
    constructor() {
        this._manager = new TaskManager();
    }
    start() {
        let running = true;
        while (running) {
            const choice = prompt("Chọn chức năng:\n" +
                "1. Thêm nhân viên mới\n" +
                "2. Thêm công việc mới\n" +
                "3. Gán công việc cho nhân viên\n" +
                "4. Đánh dấu công việc hoàn thành\n" +
                "5. Hiển thị danh sách công việc\n" +
                "6. Dừng chương trình\n");
            switch (choice) {
                case "1":
                    const employeeName = prompt("Nhập tên nhân viên:");
                    const employeeRole = prompt("Nhập vai trò của nhân viên:");
                    if (employeeName && employeeRole)
                        this._manager.addEmployee(employeeName, employeeRole);
                    break;
                case "2":
                    const taskTitle = prompt("Nhập tên công việc:");
                    const taskDeadline = prompt("Nhập hạn hoàn thành (YYYY-MM-DD):");
                    if (taskTitle && taskDeadline)
                        this._manager.addTask(taskTitle, taskDeadline);
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
const app1 = new Main1();
app1.start();
