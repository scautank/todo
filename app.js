var express = require('express'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
	path = require('path'),
	webRouter = require('./web_router'),
	apiRouter = require('./api_router'),
	config = require('./config');

//静态文件目录
var staticDir = path.join(__dirname, 'public');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');

app.engine('html', require('ejs-mate'));
// app.locals._layoutFile = 'layout.html';

app.use(bodyParser.urlencoded({
	extended : true
}));

app.use('/public', express.static(staticDir));

//routes
app.use('/', webRouter);
app.use('/api', apiRouter);

if(config.debug){
	app.use(errorhandler());
} else {
	app.use(function(err, req, res, next){
		return res.status(500).send('500 status');
	});
}

var port = parseInt(process.argv[2]) ? parseInt(process.argv[2]) : config.port;

app.listen(port, function(){
	console.log('listening on port %d in %s mode', port, app.settings.env);
});

module.exports = app;

