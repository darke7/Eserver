let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
	res.type('text/plain');
	res.status(200);
	res.send('welcome Eserver!');
});

router.get('/about',(req,res)=>{
	res.type('text/plain');
	res.status(200);
	res.send('about Eserver');
});

module.exports = router;