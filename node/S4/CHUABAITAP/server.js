const bodyParser = require('body-parser');
const express= require('express');
const path = require('path');
const app= express();
const morgan= require('morgan');
const userRouter= require('./routers/user.routes');
const todoRouter= require('./routers/todo.routes');
app.use(express.static('public'));
app.use(morgan("combined"));
// app.use(catchErr);
// app.use(checkRole);
app.use(express.urlencoded({extended:true}));
app.use(express.json());

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
    res.sendFile(path.join(__dirname, 'public', 'todo-list-layout.html'));
});
app.use('/users',userRouter);
app.use('/todos',todoRouter);
app.listen(3000,()=>{
    console.log('http://localhost:3000');

});