let express = require('express');
let fs = require('fs');
let path = require('path');
let setWeatherData = require('./lib/weather-data.js');
let credentials = require('./credentials.js');
let flashMessage = require('./lib/flash-message.js');
let setEmail = require('./lib/email.js');
let cookie = require('cookie-parser')(credentials.cookieSecret);
let session = require('express-session')({
  resave: true,
  saveUninitialized: true,
  secret: credentials.cookieSecret,
});
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

let app = express();
let api = require('./router/api.js');
let home = require('./router/home.js');
let users = require('./router/users.js');

app.set('env','production');

app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',process.env.POERT||3000);
app.disable('x-powered-by');

switch(app.get('env')){
	case 'development':
		app.use(morgan('env'));
		break;
	case 'production':
		app.set('view cache',true);
		let logDir = path.join(process.cwd(),'logs');
		fs.existsSync(logDir)||fs.mkdirSync(logDir);
		// let accessLogStream = fs.createWriteStream(path.join(process.cwd(),'Eserver.log'), {flags: 'a'});
		var accessLogStream = fileStreamRotator.getStream({
		    date_format: 'YYYYMMDD',
		    filename: path.join(logDir, 'access-%DATE%.log'),
		    frequency: 'daily',
		    verbose: true
		});
		app.use(morgan('short', {stream: accessLogStream}));
		break;
}

app.use(cookie);
app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(setWeatherData);
app.use(flashMessage);
app.use(express.static(__dirname+'/public'));

app.use('/api',api);
app.use('/', home);
app.use('/users',users);





app.use((req,res)=>{
	res.status(404);
	res.render('404');
});

app.use((err,req,res,next)=>{
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

var log = `started ${app.get('env')} and view_cache ${app.get('view cache')},url:http://localhost:${app.get('port')}`;
let startServer = (log)=>{
	app.listen(app.get('port'),(req,res)=>{
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
