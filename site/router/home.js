let express = require('express');
let router = express.Router();
let Vacation = require('../models/vacation.js');

router.get('/',(req,res)=>{
	Vacation.find({},(err,vacations)=>{
		let context = {
			vacations:vacations.map((vacation)=>{
				return {
					name:vacation.name,
					price:vacation.displayPrice
				}
			})
		};
		res.render('home',context);
	});
	
});

router.get('/about',(req,res)=>{
	res.render('about');
});


module.exports = router;