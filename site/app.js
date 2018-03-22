let express = require('express');
let app = express();
let handlebars = require('express3-handlebars').create({defaultLayout:'main'});

let home = require('./router/home.js');

app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',process.env.POERT||3000);


app.use(express.static(__dirname+'/public'));
app.use('/', home);






app.use((req,res)=>{
	res.status(404);
	res.render('404');
});

app.use((err,req,res,next)=>{
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),(req,res)=>{
	console.log(`started ${app.get('env')}:http://localhost:${app.get('port')}`);
});