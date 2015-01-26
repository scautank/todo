var todoModel = require('../models/todo');

exports.dyclist = function(req, res, next){
	res.render('todo/index');
};

exports.list = function(req, res, next) {
	todoModel.list(function(err, result){
		if(err) 
			next(err);

		res.render('todo/list', {list : result});
	});
};