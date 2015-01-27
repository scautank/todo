var todoModel = require('../models/todo');

exports.list = function(req, res, next) {
	todoModel.list(function(err, result){
		if(err)
			return next(err);

		res.send({
			success : true,
			result : result
		});
	});
};

exports.add = function(req, res, next) {
	var title,_ref;
	title = (_ref = req.body.title) != null ? _ref.trim() : void 0;
	if(!(title != null ? title.length : void 0)) {
		res.status(400);
		res.send({error_msg : '内容不能为空！'});
		return;
	}

	todoModel.add({title : title}, function(err, result){
		if(err) 
			return next(err);

		if(result.affectedRows){
			res.send({
				success : true
			});
		}
	});
};

exports.edit = function(req, res, next) {
	var id,title,_ref;
	
	id = parseInt(req.params.id);
	title = (_ref = req.body.title) != null ? _ref.trim() : void 0;

	if(!(id > 0)) {
		res.status(400);
		res.send({error_msg : '没有该条数据'});
		return;
	}

	if(!(title != null ? title.length : void 0)) {
		res.status(400);
		res.send({error_msg : '内容不能为空！'});
		return;
	}

	todoModel.edit({title : title}, {id : id}, function(err, result){
		if(err)
			return next(err);

		if(result.affectedRows) {
			res.send({
				success : true
			});
		} else {
			res.status(400);
			res.send({error_msg : '没有该条数据'});
		}
	});
};

exports.del = function(req, res, next) {
	var id = parseInt(req.params.id);

	if(!(id > 0)) {
		res.status(400);
		res.send({error_msg : '没有该条数据'});
		return;
	}

	todoModel.del({id : id}, function(err, result){
		if(err)
			return next(err);

		if(result.affectedRows){
			res.send({
				success : true
			});
		} else {
			res.status(400);
			res.send({error_msg : '没有该条数据'});
		}
	});
};