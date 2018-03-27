let express = require('express');
let app = express();
let setWeatherData = require('./lib/weather-data.js');
let credentials = require('./credentials.js');
let flashMessage = require('./lib/flash-message.js');
let cookie = require('cookie-parser')(credentials.cookieSecret);
let session = require('express-session')({
  resave: true,
  saveUninitialized: true,
  secret: credentials.cookieSecret,
});
let bodyParser = require('body-parser');

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

let api = require('./router/api.js');
let home = require('./router/home.js');
let users = require('./router/users.js');

app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',process.env.POERT||3000);
app.disable('x-powered-by');

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

app.listen(app.get('port'),(req,res)=>{
	console.log(`started ${app.get('env')}:http://localhost:${app.get('port')}`);
});

