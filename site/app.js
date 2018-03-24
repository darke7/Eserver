let express = require('express');
let app = express();
let setWeatherData = require('./lib/weather-data.js');

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

app.use(setWeatherData);
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

