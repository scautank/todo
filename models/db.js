var mysql = require('mysql');

var config = require('../config');

var pool = function(){
	var item,opt = {};
	var config_mysql = config.mysql;

	for(item in config_mysql){
		opt[item] = config_mysql[item];
	}

	opt.queryFormat = function (query, values) {
  		if (!values) return query;

  		if(Array.isArray(values)) {
  			return mysql.format(query, values);
  		}

	  	return query.replace(/\:(\w+)/g, function (txt, key) {
		    if (values.hasOwnProperty(key)) {
		      	return this.escape(values[key]);
		    }
		    return txt;
	  	}.bind(this));
	};

	return mysql.createPool(opt);
};

var query = function(){
	var argv = Array.prototype.slice.call(arguments, 0, arguments.length-1);
	var next = arguments[arguments.length-1];
	pool().getConnection(function(err, conn){
		if(err) next(err);
		conn.query.apply(conn, argv.concat(function(err, result){
			conn.release();
			return next(err, result);
		}));
	});
};

//插入数据
var insertData = function(table, values, next){
	return query('INSERT INTO ?? SET ?', [table, values], next)
};

//更新数据
var updateData = function(table, values, condition, next){
	return query('UPDATE ?? SET ? WHERE ?', [table, values, condition], next);
};

//删除数据
var deleteData = function(table, condition, next){
	return query('DELETE FROM ?? WHERE ?', [table, condition], next);
};

//存储过程
var callPro = function(name, argvs, next){
	return query('CALL ' + name + '('+ argvs +')', next);
};

//函数
var selectFunc = function(name, argvs, next){
	return query('SELECT ' + name + '('+ argvs +')', next);
};

module.exports = {
	query      : query,
	insertData : insertData,
	updateData : updateData,
	deleteData : deleteData,
	callPro    : callPro,
	selectFunc : selectFunc
};

