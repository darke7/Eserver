let express = require('express');
let fs = require('fs');
let path = require('path');
let config = require('./config/config.js');
let setWeatherData = require('./lib/weather-data.js');
let flashMessage = require('./lib/flash-message.js');
let sendEmail = require('./lib/email.js');
let db = require('./lib/db.js');
let favicon = require('serve-favicon');
let cookie = require('cookie-parser')(config.$salt);
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let bodyParser = require('body-parser');
let morgan = require('morgan');
let fileStreamRotator = require('file-stream-rotator');
let handlebars = require('express3-handlebars').create({
		defaultLayout:'main',
		helpers:{
			section(name,options){
				if(!this._sections){
					this._sections = {};
				}
				this._sections[name] = options.fn(this);
				return null;
			}
		}
	});

let autoViews = {};

let app = express();
let api = require('./router/api.js');
let home = require('./router/home.js');
let users = require('./router/users.js');
let test = require('./router/test.js');

app.set('env',config.env||'production');

app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',config.port||3000);
app.disable('x-powered-by');


app.use((req,res,next)=>{
	let domain = require('domain').create();
	domain.on('error',(err)=>{
		console.error('Domain error',err.stack);
		try{
			setTimeout(()=>{
				console.log('Fail-safe shutdown！');
				process.exit(1);
			}, 5000);
			let worker = require('cluster').worker;
			if(worker){
				worker.disconnect();
			}
			server.close();
			try{
				next(err);
			}catch(err){
				console.error('Unable to use wrong route, will return a text response. . .',err.stack);
				res.statusCode = 500;
				res.setHeader('content-type','text/plain');
				res.end('sorry this service is currently abnormal.');
			}
		}catch(err){
			console.error('Unable to return error message. . .',err.stack);
		}
		sendEmail(config.admin,'Your site has a catastrophic error! s',err.stack);
	});
	domain.add(req);
	domain.add(res);
	domain.run(next);
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
switch(app.get('env')){
	case 'development':
	    app.set('view cache',false);
		app.use(morgan('dev'));
		break;
	case 'production':
		app.set('view cache',true);
		let logDir = path.join(process.cwd(),'logs');
		fs.existsSync(logDir)||fs.mkdirSync(logDir);
		// let accessLogStream = fs.createWriteStream(path.join(process.cwd(),'Eserver.log'), {flags: 'a'});
		let accessLogStream = fileStreamRotator.getStream({
		  filename: path.join(logDir,'/access-%DATE%.log'),
		  frequency: 'daily',
		  verbose: false
		})
		app.use(morgan('short', {stream: accessLogStream}));
		break;
}
app.use(cookie);
app.use(session({
    secret: config.$salt,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({url:config.mongo,touchAfter: 24 * 3600})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(setWeatherData);
app.use(flashMessage);
app.use(express.static(__dirname+'/public'));


if(config.cors){
	app.use('/api',require('cors')());
}
app.use('/api',api);
app.use('/', home);
app.use('/users',users);
app.use('/test',test);
app.get('/epic-fail',(req,res)=>{
	process.nextTick(()=>{
		throw new Error('Worker died');
	});
});


app.use((req,res,next)=>{
	let path = req.path.toLowerCase();
	console.log(autoViews[path]);
	if(autoViews[path]){
		return res.render(autoViews[path]);
	}
	if(fs.existsSync(__dirname+'/views'+path+'.handlebars')){
		autoViews[path] = path.replace(/^\//,'');
		return res.render(autoViews[path]);
	}
	next();
});
app.use((req,res)=>{
	res.status(404);
	res.render('404');
});

app.use((err,req,res,next)=>{
	sendEmail(config.admin,'Your site has gone wrong!',err.stack);
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

let server;
let log = `started ${app.get('env')} and view_cache ${app.get('view cache')},url:http://localhost:${app.get('port')}`;
let startServer = (log)=>{
	server = app.listen(app.get('port'),(req,res)=>{
		if(log)console.log(log);
	});
};

if(require.main === module){
	startServer(log);
}else{
	module.exports = {
		startServer,
		log
	};
}
