const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// link file
const filePath = path.join(__dirname, '../data/questions.json');

// read file
const readQuestions = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// write file
const writeQuestions = (questions) => {
    const data = JSON.stringify(questions, null, 2);
    fs.writeFileSync(filePath, data);
}

// Middleware kiểm tra tồn tại
const checkExist = (req, res, next) => {
    const questions = readQuestions();
    const { id } = req.params;
    const { content } = req.body;

    if (id) {
        const question = questions.find(q => q.id === Number(id));
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
    }

    if (content) {
        const existingQuestion = questions.find(q => q.content.toLowerCase() === content.toLowerCase());
        if (existingQuestion) {
            return res.status(400).json({ message: "Question already exists" });
        }
    }

    next();
};

// Buoc 1: Lấy tất cả câu hỏi
router.get(`/`, function (req, res) {
    res.status(200).json(readQuestions());
})

// Buoc 2: Lấy câu hỏi theo id
router.get(`/:id`, checkExist, function (req, res) {
    const questions = readQuestions();
    const question = questions.find(q => q.id === Number(req.params.id));
    res.status(200).json(question);
})

// Buoc 3: Thêm câu hỏi
router.post(`/`, checkExist, function (req, res) {
    const questions = readQuestions();

    const newQuestion = {
        content: req.body.content,
        like: req.body.like || 0,
        dislike: req.body.dislike || 0,
        id: questions.length ? questions[questions.length - 1].id + 1 : 1,
    }

    questions.push(newQuestion);
    writeQuestions(questions);

    res.status(201).json({ message: "Create successfully", question: newQuestion });
});

// Buoc 4: Cập nhật câu hỏi
router.put(`/:id`, checkExist, function (req, res) {
    const questions = readQuestions();
    const questionId = Number(req.params.id);

    const index = questions.findIndex(q => q.id === questionId);
    if (index === -1) {
        return res.status(404).json({ message: "Question not found" });
    }

    const updatedQuestion = {
        ...questions[index],
        content: req.body.content || questions[index].content,
        like: req.body.like !== undefined ? Number(req.body.like) : questions[index].like,
        dislike: req.body.dislike !== undefined ? Number(req.body.dislike) : questions[index].dislike,
    };

    questions[index] = updatedQuestion;
    writeQuestions(questions);

    res.status(200).json({ message: "Update successfully", question: updatedQuestion });
});

// Buoc 5: Xóa câu hỏi
router.delete(`/:id`, checkExist, function(req, res) {
    const questions = readQuestions();
    const questionId = Number(req.params.id);

    const index = questions.findIndex(q => q.id === questionId);
    if (index === -1) {
        return res.status(404).json({ message: "Question not found" });
    }

    questions.splice(index, 1);
    writeQuestions(questions);

    res.status(200).json({ message: "Delete successfully" });
});

module.exports = router;