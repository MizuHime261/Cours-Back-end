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
const questionRouter = require('./routers/question.routes.js');


const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// EX2
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
})

app.get(`/ask`, function (req, res) {
    res.sendFile(path.join(__dirname, 'public/html/ask.html'));
})

app.get(`/question-detail/:id`, function (req, res) {
    res.sendFile(path.join(__dirname, 'public/html/question-detail.html'));
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

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/public/todo-list-layout.html');
// })

app.use('/api/v1/questions', questionRouter);
// app.use('/todos', todoRouter);

app.use((req, res) => {
    res.status(404).send('<h1>PAGE NOT FOUND</h1>');
  })
  
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})


// |data
// |______backup-questions.json
// |______questions.json
// |node_modules
// |public
// |______css
//           |_____ask.css
//           |_____index.css
//           |_____question-detail.css
// |______html
//           |_____ask.html
//           |_____index.html
//           |_____question-detail.html
// |______js
//           |_____ask.js
//           |_____index.js
//           |_____question-detail.js
// |routers
// |________question.routes.js
// |app.js
// |package-lock.json
// |package.json