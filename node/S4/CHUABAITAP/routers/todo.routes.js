const express= require('express');
const router =express.Router();
const fs = require('fs');

router.get("/:id",(req,res)=>{
    res.json({message:"User detail"});
});
router.get("/",(req,res)=>{
    let todo=fs.readFileSync('./data/todo.json','utf-8');
    todo=JSON.parse(todo);
    res.json(todo);
});

router.post("/",(req,res)=>{
    res.json({message:"Create user"});
});
router.put("/:id",(req,res)=>{
    res.json({message:"Update user"});
});
router.delete("/:id",(req,res)=>{
    res.json({message:"Delete user"});
});
module.exports=router;