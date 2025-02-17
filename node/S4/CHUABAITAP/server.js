const bodyParser = require('body-parser');
const express= require('express');
const app= express();
const morgan= require('morgan');
const userRouter= require('./routers/user.router');
const todoRouter= require('./routers/todo.router');
app.use(express.static('public'));
app.use(morgan("combined"));
// app.use(catchErr);
// app.use(checkRole);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/users',userRouter);
app.use('/todos',todoRouter);

function checkStatus(req,res,next){
    let status= req.query.status;
    if(status==="1"){
        next();
    }
    else{
        res.json({message:"You are not allowed"});
    }
}
function catchErr(err,req,res,next){
    console.log(err);
    res.json({message:"Error"});
};
function checkRole(req,res,next){
    let role=req.query.role;
    if(role==="1"){
        next();
    }else{
        res.json({message:"ivalid role"});
    }
}

// app.get('/',checkStatus,(req,res)=>{
//     res.send('<h1>This is homepage</h1>');
// });
app.get("/test-middleware",checkStatus,checkRole,(req,res)=>{
    res.send("Test middleware");
});
app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/public/todolist.html');
});
app.listen(3000,()=>{
    console.log('http://localhost:3000');
});