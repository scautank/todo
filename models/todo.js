var db = require('./db');

module.exports = {
	list : function(done){
		db.query('select * from todo_list order by add_time desc', function(err, result){
			if(err) 
				return done(err);
			return done(null, result);
		});
	},

	add : function(options, done){
		return db.insertData('todo_list', options, done);
	},

	edit : function(values, condition, done){
		return db.updateData('todo_list', values, condition, done);
	},

	del : function(condition, done){
		return db.deleteData('todo_list', condition, done);
	}
}