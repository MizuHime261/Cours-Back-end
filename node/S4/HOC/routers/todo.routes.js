const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/todos.json');

// read file
const readTodos = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

// write file
const writeTodos = (todos) => {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

// get all todos
router.get('/', function(req, res){
    res.json(readTodos());
})

// get one todo
router.get('/:id', function(req, res){
    const todos = readTodos();
    const todo = todos.find(todo => todo.id === Number(req.params.id));
    if(!todo){
        return res.status(404)
        .json({
            message: 'Todo not found'
        });
    }
    res.json(todo);
})

// create one todo
router.post('/', function(req, res){
    const todos = readTodos();
    const newTodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        content: req.body.content,
        status: false
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
})

// update one todo
router.put('/:id', function(req, res){
    const todos = readTodos();
    const index = todos.findIndex(t => t.id === Number(req.params.id));
    if(index === -1){
        return res.status(404)
        .json({
            message: 'Todo not found'
        });
    }
    todos[index].content = req.body.content || todos[index].content;
    todos[index].status = req.body.status ?? todos[index].status;
    writeTodos(todos);
    res.json(todos[index]);
})

// delete one todo
router.delete('/:id', function(req, res){
    let todos = readTodos();
    todos = todos.filter(t => t.id != Number(req.params.id));
    writeTodos(todos);
    res.json({
        message: 'Delete todo successfully'
    });
})

module.exports = router;