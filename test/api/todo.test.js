var app = require('../../app'),
	db = require('../../models/db'),
	should = require('should'),
	async = require('async'),
	request = require('supertest')(app);

describe('test/api/todo.test.js', function() {
	before(function (done) {
		async.series([
			function (cb) {
				db.query('TRUNCATE TABLE todo_list', cb);
			},
			function (cb) {
				db.insertData('todo_list', {title: 'coding'}, cb)
			}
		], done);
	});

	describe('list', function(){
		it('should get a todo list', function (done) {
			request.get('/api/todo/list')
				.end(function (err, res) {
					should.not.exists(err);
					res.body.success.should.true;
					done();
				});
		});
	});

	describe('add', function(){
		it('should get a 400 error, error_msg is 内容不能为空！', function (done) {
			request.post('/api/todo/add')
				.end(function (err, res) {
					should.not.exists(err);
					res.status.should.equal(400);
					res.body.error_msg.should.equal('内容不能为空！');
					done();
				});
		});

		it('should successfully added a data', function (done) {
			request.post('/api/todo/add')
				.send('title=nodejs')
				.end(function (err, res) {
					should.not.exists(err);
					res.body.success.should.true;
					done();
				});
		});
	});

	describe('edit', function (done) {
		it('should get a 400 error, error_msg is 没有该条数据', function (done) {
			request.post('/api/todo/edit/a')
				.send('title=javascript')
				.end(function (err, res) {
					should.not.exists(err);
					res.status.should.equal(400);
					res.body.error_msg.should.equal('没有该条数据');
					done();
				});
		});

		it('should get a 400 error, error_msg is 内容不能为空！', function (done) {
			request.post('/api/todo/edit/1')
				.end(function (err, res) {
					should.not.exists(err);
					res.status.should.equal(400);
					res.body.error_msg.should.equal('内容不能为空！');
					done();
				});
		});

		it('should successfully edited a data', function (done) {
			request.post('/api/todo/edit/1')
				.send('title=javascript')
				.end(function (err, res) {
					should.not.exists(err);
					res.body.success.should.true;
					done();
				});
		});

		it('should get a 400 error, error_msg is 没有该条数据', function (done) {
			request.post('/api/todo/edit/10')
				.send('title=javascript')
				.end(function (err, res) {
					should.not.exists(err);
					res.status.should.equal(400);
					res.body.error_msg.should.equal('没有该条数据');
					done();
				});
		});
	});

	describe('del', function (done) {
		it('should get a 400 error, error_msg is 没有该条数据', function (done) {
			request.get('/api/todo/del/a')
				.end(function (err, res) {
					should.not.exists(err);
					res.status.should.equal(400);
					res.body.error_msg.should.equal('没有该条数据');
					done();
				});
		});

		it('should successfully deleted a data', function (done) {
			request.get('/api/todo/del/2')
				.end(function (err, res) {
					should.not.exists(err);
					res.body.success.should.true;
					done();
				});
		});

		it('should get a 400 error, error_msg is 没有该条数据', function (done) {
			request.get('/api/todo/del/11')
				.end(function (err, res) {
					should.not.exists(err);
					res.status.should.equal(400);
					res.body.error_msg.should.equal('没有该条数据');
					done();
				});
		});
	});
});


