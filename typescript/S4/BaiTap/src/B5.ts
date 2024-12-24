class Student {
    private static _idCounter = 1;
    private _id: number;
    private _name: string;

    constructor(name: string){
        this._id = Student._idCounter++;
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (!value.trim()) {
            throw new Error("Tên sinh viên không được để trống.");
        }
        this._name = value;
    }
}

class Course {
    private static _idCounter = 1;
    private _id: number;
    private _title: string;

    constructor(title: string){
        this._id = Course._idCounter++;
        this._title = title;
    }

    get id(): number {
        return this._id
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (!value.trim()) {
            throw new Error("Tên khóa học không được để trống.");
        }
        this._title = value;
    }
}

class Enrollment {
    private _student: Student;
    private _course: Course;
    private _scheduleTime: string;

    constructor(student: Student, course: Course, scheduleTime: string){
        this._student = student;
        this._course = course;
        this._scheduleTime = scheduleTime;
    }
    get student(): Student {
        return this._student;
    }

    get course(): Course {
        return this._course;
    }

    get scheduleTime(): string {
        return this._scheduleTime;
    }
}

class StudyManager {
    private _students: Student[];
    private _courses: Course[];
    private _enrollments: Enrollment[];

    constructor(){
        this._students = [];
        this._courses = [];
        this._enrollments = [];
    }

    addStudent(name: string): void {
        if (!name.trim()) {
            console.log("⚠️ Tên sinh viên không được để trống.");
            return;
        }
        const student = new Student(name);
        this._students.push(student);
        console.log(`✅ Đã thêm sinh viên: ${student.name} (ID: ${student.id})`);
    }

    addCourse(title: string): void {
        if (!title.trim()) {
            console.log("⚠️ Tên khóa học không được để trống.");
            return;
        }
        const course = new Course(title);
        this._courses.push(course);
        console.log(`✅ Đã thêm khóa học: ${course.title} (ID: ${course.id})`);
    }

    enrollStudent(studentId: number, courseId: number, scheduleTime: string): void {
        const student = this._students.find(s => s.id === studentId);
        const course = this._courses.find(c => c.id === courseId);

        if (!student) {
            console.log("⚠️ Không tìm thấy sinh viên với ID đã cho.");
            return;
        }

        if (!course) {
            console.log("⚠️ Không tìm thấy khóa học với ID đã cho.");
            return;
        }

        const enrollment = new Enrollment(student, course, scheduleTime);
        this._enrollments.push(enrollment);
        console.log(`✅ Đã đăng ký khóa học "${course.title}" cho sinh viên: ${student.name} vào thời gian: ${scheduleTime}`);
    }

    listEnrollments(): void {
        if (this._enrollments.length === 0) {
            console.log("📋 Chưa có thời khóa biểu nào.");
            return;
        }

        this._enrollments.forEach(enrollment => {
            console.log(`Sinh viên: ${enrollment.student.name}, Khóa học: ${enrollment.course.title}, Thời gian: ${enrollment.scheduleTime}`);
        });
    }
}

class Main5 {
    private _manager: StudyManager = new StudyManager();

    start(): void {
        let running = true;
        while (running) {
            const choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm sinh viên mới\n" +
                "2. Thêm khóa học mới\n" +
                "3. Đăng ký khóa học cho sinh viên\n" +
                "4. Hiển thị thời khóa biểu học tập\n" +
                "5. Dừng chương trình\n"
            );

            switch (choice) {
                case "1":
                    const studentName = prompt("Nhập tên sinh viên:");
                    if (studentName) this._manager.addStudent(studentName);
                    break;
                case "2":
                    const courseTitle = prompt("Nhập tên khóa học:");
                    if (courseTitle) this._manager.addCourse(courseTitle);
                    break;
                case "3":
                    const studentId = parseInt(prompt("Nhập ID sinh viên:") || "0", 10);
                    const courseId = parseInt(prompt("Nhập ID khóa học:") || "0", 10);
                    const scheduleTime = prompt("Nhập thời gian học (ví dụ: 08:00 AM - 10:00 AM):");
                    if (scheduleTime) this._manager.enrollStudent(studentId, courseId, scheduleTime);
                    break;
                case "4":
                    this._manager.listEnrollments();
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

let app5 = new Main5();
app5.start();