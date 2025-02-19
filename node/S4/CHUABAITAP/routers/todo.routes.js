const express= require('express');
const router =express.Router();
const fs = require('fs');

router.get("/:id",(req,res)=>{
    res.json({message:"User detail"});
});
router.get("/",(req,res)=>{
    let todo=fs.readFileSync('./data/todos.json','utf-8');
    todo=JSON.parse(todo);
    res.json(todo);
});

router.post("/",(req,res)=>{
    // trich xuat thong tin client gui len
    // tu body
    let content = req.body.content;
    let todo = {
        id: Math.random(),
        content: content,
        status: false,
    };

    let todos = fs.readFileSync('./data/todos.json', 'utf-8');
        todos = JSON.parse(todos); // Đảm bảo parse đúng

        todos.push(todo); // Thêm công việc mới

        fs.writeFileSync('./data/todos.json', JSON.stringify(todos, null, 2)); // Ghi lại vào file
        res.json({ message: "Create todo successfully" });
});
router.put("/:id", (req, res) => {
    let id = req.params.id;
    let status = req.body.status;  // Lấy status từ body của request

    let todos = fs.readFileSync('./data/todos.json', 'utf-8');
    todos = JSON.parse(todos);

    let updateIndex = todos.findIndex(function(e) {
        return e.id === +id;  // Tìm todo có id tương ứng
    });

    if (updateIndex !== -1) {
        todos[updateIndex].status = status;  // Cập nhật trạng thái của todo
        fs.writeFileSync('./data/todos.json', JSON.stringify(todos, null, 2));  // Ghi lại vào file
        res.json({ message: "Todo status updated successfully" });
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
});
router.delete("/:id",(req,res)=>{
    res.json({message:"Delete user"});
});
module.exports=router;