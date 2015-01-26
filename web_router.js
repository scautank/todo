var express = require('express');

var todo = require('./controllers/todo');

var router = express.Router();

router.get('/todo', todo.dyclist);
router.get('/todo/list', todo.list);

module.exports = router;