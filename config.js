var config = {
	//调试，生产环境设置为false
	debug : true,

	mysql : {
		host : '127.0.0.1',

		user : 'root',

		password : '',

		database : 'todo',

		port : 3306
	},

	//程序运行端口
	port : 3000
};

module.exports = config;