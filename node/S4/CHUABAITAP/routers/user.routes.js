const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res){
    res.json({message: 'Get one user successfully'});
})

router.get('/', function(req, res){
    res.json({message: 'Get all users successfully'});
})

router.post('/', function(req, res){
    res.json({message: 'Create user successfully'});
})

router.put('/:id', function(req, res){
    res.json({message: 'Update one user successfully'});
})

router.delete('/:id', function(req, res){
    res.json({message: 'Delete one user successfully'});
})
module.exports = router;