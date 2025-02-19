// npm init
//npm install -g nodemon
//npm install express
//npm install nodemon
//npm install body-parser
//npm install -g json-server
//npm i morgan
// npm run dev
const express =require('express');
const fs= require('fs');
const path = require('path');
const bodyParser=require('body-parser');
const morgan = require('morgan');
// const userRouter = require('./routers/user.routes.js');
// const todoRouter = require('./routers/todo.routes.js');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// EX2
app.get('/', function (req, res) {
    res.send('This is homepage')
})

app.get(`/ask`, function (req, res) {
    res.send('This is asking page')
})

app.get(`/question-detail/:id`, function (req, res) {
    res.send('This is a question detail page')
})

// EX4
const checkExist = (req, res, next) => {
    const questions = readQuestions();
    const { id } = req.params;
    const { content } = req.body;

    // Nếu có id, kiểm tra xem câu hỏi có tồn tại không
    if (id) {
        const question = questions.find(q => q.id === Number(id));
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
    }

    // Nếu có content, kiểm tra xem câu hỏi đã tồn tại chưa
    if (content) {
        const existingQuestion = questions.find(
            q => q.content.toLowerCase() === content.toLowerCase()
        );
        if (existingQuestion) {
            return res.status(400).json({ message: "Question already exists" });
        }
    }

    next();
}

// EX3
// link file
const filePath = path.join(__dirname, './data/questions.json');
// read file
const readQuestions = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}
//write file
const writeQuestions = (questions) => {
    const data = JSON.stringify(questions, null, 2);
    fs.writeFileSync(filePath, data);
}

// Buoc 1:
app.get(`/api/v1/questions`, function (req, res) {
    res.status(200).json(readQuestions());
})

// Buoc 2:
app.get(`/api/v1/questions/:id`, checkExist, function (req, res) {
    const questions = readQuestions();
    const question = questions.find(q => q.id === Number(req.params.id));
    res.status(200).json(question);
})

// Buoc 3:
app.post(`/api/v1/questions`,checkExist, function (req, res) {
    const questions = readQuestions();

    // Tạo id cho câu hoi mới
    const newQuestion = {
        content: req.body.content,
        like: req.body.like,
        dislike: req.body.dislike,
        id: questions.length ? questions[questions.length - 1].id + 1 : 1,
    }

    // Thêm câu hoi mới vào mảng questions
    questions.push(newQuestion);
    writeQuestions(questions);

    // Trả về phản hồi thành công
    res.status(201).json(
        { message: "Create successfully", question: newQuestion}
    );
})

// Buoc4:
app.put(`/api/v1/questions/:id`, checkExist, function (req, res) {
    const questions = readQuestions();

    // Kiểm tra nếu id không tồn tại trong mảng
    const questionId = Number(req.params.id);

    // Nếu id không tồn tại trong mảng
    const index = questions.findIndex( q => q.id === questionId );

    // Cập nhật dữ liệu câu hỏi
    const updatedQuestion = {
        ...questions[index],
        content: req.body.content || questions[index].content,
        like: req.body.like !== undefined ? Number(req.body.like) : questions[index].like,
        dislike: req.body.dislike !== undefined ? Number(req.body.dislike) : questions[index].dislike,
    };

    // Ghi đè dữ liệu vào mảng
    questions[index] = updatedQuestion;
    writeQuestions(questions);

    // Trả về phản hồi thành công
    res.status(200).json({ message: "Update successfully", question: updatedQuestion });
})

// Buoc 5:
app.delete(`/api/v1/questions/:id`, checkExist, function(req, res) {
    const questions = readQuestions();
    const questionId = Number(req.params.id);

    // Tìm vị trí của câu hỏi trong mảng
    const index = questions.findIndex(q => q.id === questionId);

    // Xóa câu hỏi khỏi mảng
    questions.splice(index, 1);

    // Ghi đè dữ liệu mới vào file JSON
    writeQuestions(questions);

    // Trả về phản hồi thành công
    res.status(200).json({ message: "Delete successfully" });
});
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/public/todo-list-layout.html');
// })

// app.use('/users', userRouter);
// app.use('/todos', todoRouter);

app.use((req, res) => {
    res.status(404).send('<h1>PAGE NOT FOUND</h1>');
  })
  
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})