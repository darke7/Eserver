let express = require('express');
let router = express.Router();
let Vacation = require('../models/vacation.js');

router.get('/',(req,res)=>{
	Vacation.find({},(err,vacations)=>{
		let currency = req.session.currency||'USD';
		let context = {
			currency:currency,
			vacations:vacations.map((vacation)=>{
				return {
					name:vacation.name,
					price:vacation.displayPrice
				}
			})
		};
		switch(currency){
			case 'USD':context.currencyUSD = 'selected';break;
			case 'GBP':context.currencyGBP = 'selected';break;
			case 'BTC':context.currencyBTC = 'selected';break;
		};
		res.render('home',context);
	});
	
});

router.get('/about',(req,res)=>{
	res.render('about');
});

router.get('/set-currency/:currency',(req,res)=>{
	req.session.currency = req.params.currency;
	req.session.name = 'xiaoyi';
	req.session.id = 'i****qaklazsdfjg';
	return res.redirect(303,'/');
});

let convertFromUSD = (value,currency)=>{
	switch(currency){
		case 'USD':return value*1;
		case 'GBP':return value*0.6;
		case 'BTC':return value*0.00237;
		default:return NaN;
	}
}

module.exports = router;