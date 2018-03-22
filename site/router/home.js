let express = require('express');
let router = express.Router();
let fortune = require('../lib/fortune.js');

router.get('/',(req,res)=>{
	res.render('home');
});

router.get('/about',(req,res)=>{
	res.render('about');
});

router.get('/fortune',(req,res)=>{
	if(req.xhr){
		res.json({
			fortune:fortune()
		});
	}else{
		res.redirect(404,'404');
	}
});

module.exports = router;