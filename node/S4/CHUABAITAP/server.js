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
const userRouter = require('./routers/user.routes.js');
const todoRouter = require('./routers/todo.routes.js');

const app = express();
const port = 3000;

// Kiểm tra xem request được gửi lên trên server
// có tồn tại 1 trạng thái status = 1 hay không
// - Nếu có thì tiếp tục response về phía client
// - Nếu không ngay lập tức dừng quá trình req - res cycle
function checkStatus(req, res, next){
    let status = req.query.status;
    if(status === '1'){
        next();
    } else {
        res.json({message: 'Status is not 1'});
    }
}

function catchErrors(error, req, res, next){
    console.log(error);
    res.json({error: error,}); 
}

function checkRole(req, res, next){
    let role = req.query.role;
    if(role === "1"){
        next();
    } else {
        res.json({message: 'Invalid role'});
    }
}

app.use(morgan('dev'));
app.use(express.static('public'));
// app.use(catchErrors);
// app.use(checkStatus);
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/todo-list-layout.html');
})

app.get('/about', function (req, res) {
    res.json({message: 'This is about page'});
}) 

app.get("/test-middleware", checkStatus, checkRole, function(req, res, next){
    res.json({message: 'This is test middleware page'});
})

app.use('/users', userRouter);
app.use('/todos', todoRouter);

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
  })
  
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})