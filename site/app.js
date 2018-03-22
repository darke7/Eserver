let express = require('express');
let app = express();

let home = require('./router/home.js');

app.set('port',process.env.POERT||3000);

app.use('', home);






app.use((req,res)=>{
	res.type('text/plain');
	res.status(404);
	res.send('404 -- nofound');
});

app.use((err,req,res,next)=>{
	res.type('text/plain');
	res.status(500);
	res.send('500 -- server error');
});

app.listen(app.get('port'),(req,res)=>{
	console.log(`started ${app.get('env')}:http://localhost:${app.get('port')}`);
});