"use strict";
class Person3 {
    constructor(id, name, email) {
        this._id = id;
        this._name = name;
        this._email = email;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    getDetails() {
        return `Người dùng [ID: ${this._id}, Tên: ${this._name}, Email: ${this._email}]`;
    }
}
class Student extends Person3 {
    constructor(id, name, email) {
        super(id, name, email);
        this._enrolledCourses = [];
    }
    enroll(course) {
        this._enrolledCourses.push(course);
        console.log(`${this._name} đã đăng ký khóa học: ${course.title}`);
    }
    get enrolledCourses() {
        return this._enrolledCourses;
    }
}
class Course {
    constructor(courseId, title, duration, price) {
        this._courseId = courseId;
        this._title = title;
        this._duration = duration;
        this._price = price;
    }
    get courseId() {
        return this._courseId;
    }
    get title() {
        return this._title;
    }
    get duration() {
        return this._duration;
    }
    get price() {
        return this._price;
    }
    getDetails() {
        return `Khóa học [ID: ${this._courseId}, Tiêu đề: ${this._title}, Thời gian: ${this._duration} giờ, Học phí: ${this.calculatePrice()}]`;
    }
}
class BasicCourse extends Course {
    constructor(courseId, title, duration, price) {
        super(courseId, title, duration, price);
    }
    calculatePrice() {
        return this._price;
    }
}
class PremiumCourse extends Course {
    constructor(courseId, title, duration, price, materialFee) {
        super(courseId, title, duration, price);
        this._materialFee = materialFee;
    }
    calculatePrice() {
        return this._price + this._materialFee;
    }
}
class LiveCourse extends Course {
    constructor(courseId, title, duration, price, instructorFee) {
        super(courseId, title, duration, price);
        this._instructorFee = instructorFee;
    }
    calculatePrice() {
        return this._price + this._instructorFee;
    }
}
class Enrollment {
    constructor(student, course) {
        this._student = student;
        this._course = course;
        this._enrollmentDate = new Date();
    }
    getDetails() {
        return `Đăng ký [Học viên: ${this._student.name}, Khóa học: ${this._course.title}, Ngày đăng ký: ${this._enrollmentDate.toLocaleDateString()}]`;
    }
}
class CourseManager {
    constructor() {
        this._courses = [];
        this._students = [];
        this._enrollments = [];
    }
    addCourse(type, title, duration, price, materialFee, instructorFee) {
        let course;
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
    addStudent(name, email) {
        const student = new Student(CourseManager._studentIdCounter++, name, email);
        this._students.push(student);
        console.log(`✅ Đã thêm học viên: ${student.getDetails()}`);
    }
    enrollStudent(studentId, courseId) {
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
    listCourses() {
        if (this._courses.length === 0) {
            console.log("📋 Không có khóa học nào.");
            return;
        }
        this._courses.forEach(c => console.log(c.getDetails()));
    }
    listEnrollments() {
        if (this._enrollments.length === 0) {
            console.log("📋 Không có đăng ký nào.");
            return;
        }
        this._enrollments.forEach(e => console.log(e.getDetails()));
    }
}
CourseManager._courseIdCounter = 1;
CourseManager._studentIdCounter = 1;
class Main4 {
    constructor() {
        this._manager = new CourseManager();
    }
    start() {
        let running = true;
        while (running) {
            const choice = prompt("Chọn chức năng:\n" +
                "1. Thêm khóa học mới\n" +
                "2. Thêm học viên mới\n" +
                "3. Đăng ký học viên vào khóa học\n" +
                "4. Hiển thị danh sách khóa học\n" +
                "5. Hiển thị danh sách đăng ký\n" +
                "6. Dừng chương trình\n");
            switch (choice) {
                case "1":
                    const courseType = prompt("Nhập loại khóa học (Basic, Premium, Live):");
                    const courseTitle = prompt("Nhập tên khóa học:");
                    const courseDuration = parseInt(prompt("Nhập thời gian khóa học (giờ):") || "0", 10);
                    const coursePrice = parseInt(prompt("Nhập học phí khóa học:") || "0", 10);
                    let materialFee = 0, instructorFee = 0;
                    if (courseType === "Premium") {
                        materialFee = parseInt(prompt("Nhập phí tài liệu:") || "0", 10);
                    }
                    else if (courseType === "Live") {
                        instructorFee = parseInt(prompt("Nhập phí giảng viên:") || "0", 10);
                    }
                    if (courseType && courseTitle && courseDuration && coursePrice) {
                        this._manager.addCourse(courseType, courseTitle, courseDuration, coursePrice, materialFee, instructorFee);
                    }
                    break;
                case "2":
                    const studentName = prompt("Nhập tên học viên:");
                    const studentEmail = prompt("Nhập email học viên:");
                    if (studentName && studentEmail)
                        this._manager.addStudent(studentName, studentEmail);
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
