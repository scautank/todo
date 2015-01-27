var express = require('express');

var todo = require('./api/todo');

var router = express.Router();

router.get('/todo/list',todo.list);
router.post('/todo/add', todo.add);
router.get('/todo/del/:id', todo.del);
router.post('/todo/edit/:id', todo.edit);

module.exports = router;