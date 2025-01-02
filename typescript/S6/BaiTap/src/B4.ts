abstract class Person3 {
    protected _id: number;
    protected _name: string;
    protected _email: string;

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

    getDetails(): string {
        return `Người dùng [ID: ${this._id}, Tên: ${this._name}, Email: ${this._email}]`;
    }
}

class Student extends Person3 {
    private _enrolledCourses: Course[];

    constructor(id: number, name: string, email: string) {
        super(id, name, email);
        this._enrolledCourses = [];
    }

    enroll(course: Course): void {
        this._enrolledCourses.push(course);
        console.log(`${this._name} đã đăng ký khóa học: ${course.title}`);
    }

    get enrolledCourses(): Course[] {
        return this._enrolledCourses;
    }
}

abstract class Course {
    protected _courseId: number;
    protected _title: string;
    protected _duration: number; 
    protected _price: number;

    constructor(courseId: number, title: string, duration: number, price: number) {
        this._courseId = courseId;
        this._title = title;
        this._duration = duration;
        this._price = price;
    }

    get courseId(): number {
        return this._courseId;
    }

    get title(): string {
        return this._title;
    }

    get duration(): number {
        return this._duration;
    }

    get price(): number {
        return this._price;
    }

    abstract calculatePrice(): number;

    getDetails(): string {
        return `Khóa học [ID: ${this._courseId}, Tiêu đề: ${this._title}, Thời gian: ${this._duration} giờ, Học phí: ${this.calculatePrice()}]`;
    }
}

class BasicCourse extends Course {
    constructor(courseId: number, title: string, duration: number, price: number) {
        super(courseId, title, duration, price);
    }

    calculatePrice(): number {
        return this._price; 
    }
}

class PremiumCourse extends Course {
    private _materialFee: number;

    constructor(courseId: number, title: string, duration: number, price: number, materialFee: number) {
        super(courseId, title, duration, price);
        this._materialFee = materialFee;
    }

    calculatePrice(): number {
        return this._price + this._materialFee; 
    }
}

class LiveCourse extends Course {
    private _instructorFee: number; 

    constructor(courseId: number, title: string, duration: number, price: number, instructorFee: number) {
        super(courseId, title, duration, price);
        this._instructorFee = instructorFee;
    }

    calculatePrice(): number {
        return this._price + this._instructorFee; 
    }
}

class Enrollment {
    private _student: Student;
    private _course: Course;
    private _enrollmentDate: Date;

    constructor(student: Student, course: Course) {
        this._student = student;
        this._course = course;
        this._enrollmentDate = new Date();
    }

    getDetails(): string {
        return `Đăng ký [Học viên: ${this._student.name}, Khóa học: ${this._course.title}, Ngày đăng ký: ${this._enrollmentDate.toLocaleDateString()}]`;
    }
}

class CourseManager {
    private _courses: Course[];
    private _students: Student[];
    private _enrollments: Enrollment[];

    private static _courseIdCounter = 1;
    private static _studentIdCounter = 1;

    constructor() {
        this._courses = [];
        this._students = [];
        this._enrollments = [];
    }

    addCourse(type: string, title: string, duration: number, price: number, materialFee?: number, instructorFee?: number): void {
        let course: Course;
        switch (type) {
            case "Basic":
                course = new BasicCourse(CourseManager._courseIdCounter++, title, duration, price);
                break;
            case "Premium":
                course = new PremiumCourse(CourseManager._courseIdCounter++, title, duration, price, materialFee || 0);
                break;
            case "Live":
                course = new LiveCourse(CourseManager._courseIdCounter++, title, duration, price, instructorFee || 0);
                break;
            default:
                console.log("⚠️ Loại khóa học không hợp lệ.");
                return;
        }
        this._courses.push(course);
        console.log(`✅ Đã thêm khóa học: ${course.getDetails()}`);
    }

    addStudent(name: string, email: string): void {
        const student = new Student(CourseManager._studentIdCounter++, name, email);
        this._students.push(student);
        console.log(`✅ Đã thêm học viên: ${student.getDetails()}`);
    }

    enrollStudent(studentId: number, courseId: number): void {
        const student = this._students.find(s => s.id === studentId);
        if (!student) {
            console.log("⚠️ Không tìm thấy học viên.");
            return;
        }

        const course = this._courses.find(c => c.courseId === courseId);
        if (!course) {
            console.log("⚠️ Không tìm thấy khóa học.");
            return;
        }

        student.enroll(course);
        const enrollment = new Enrollment(student, course);
        this._enrollments.push(enrollment);
        console.log(`✅ Đăng ký thành công: ${enrollment.getDetails()}`);
    }

    listCourses(): void {
        if (this._courses.length === 0) {
            console.log("📋 Không có khóa học nào.");
            return;
        }
        this._courses.forEach(c => console.log(c.getDetails()));
    }

    listEnrollments(): void {
        if (this._enrollments.length === 0) {
            console.log("📋 Không có đăng ký nào.");
            return;
        }
        this._enrollments.forEach(e => console.log(e.getDetails()));
    }
}

class Main4 {
    private _manager: CourseManager = new CourseManager();

    start(): void {
        let running = true;
        while (running) {
            const choice = prompt(
                "Chọn chức năng:\n" +
                "1. Thêm khóa học mới\n" +
                "2. Thêm học viên mới\n" +
                "3. Đăng ký học viên vào khóa học\n" +
                "4. Hiển thị danh sách khóa học\n" +
                "5. Hiển thị danh sách đăng ký\n" +
                "6. Dừng chương trình\n"
            );

            switch (choice) {
                case "1":
                    const courseType = prompt("Nhập loại khóa học (Basic, Premium, Live):");
                    const courseTitle = prompt("Nhập tên khóa học:");
                    const courseDuration = parseInt(prompt("Nhập thời gian khóa học (giờ):") || "0", 10);
                    const coursePrice = parseInt(prompt("Nhập học phí khóa học:") || "0", 10);
                    let materialFee = 0, instructorFee = 0;
                    if (courseType === "Premium") {
                        materialFee = parseInt(prompt("Nhập phí tài liệu:") || "0", 10);
                    } else if (courseType === "Live") {
                        instructorFee = parseInt(prompt("Nhập phí giảng viên:") || "0", 10);
                    }
                    if (courseType && courseTitle && courseDuration && coursePrice) {
                        this._manager.addCourse(courseType, courseTitle, courseDuration, coursePrice, materialFee, instructorFee);
                    }
                    break;

                case "2":
                    const studentName = prompt("Nhập tên học viên:");
                    const studentEmail = prompt("Nhập email học viên:");
                    if (studentName && studentEmail) this._manager.addStudent(studentName, studentEmail);
                    break;

                case "3":
                    const studentId = parseInt(prompt("Nhập ID học viên:") || "0", 10);
                    const courseId = parseInt(prompt("Nhập ID khóa học:") || "0", 10);
                    this._manager.enrollStudent(studentId, courseId);
                    break;

                case "4":
                    this._manager.listCourses();
                    break;

                case "5":
                    this._manager.listEnrollments();
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

const app4 = new Main4();
app4.start();