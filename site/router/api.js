let express = require('express');
let router = express.Router();
let fortune = require('../lib/fortune.js');
let Attraction = require('../models/attraction.js');

router.get('/fortune',(req,res)=>{
	res.json({
		fortune:fortune()
	});
});

router.get('/attractions',(req,res)=>{
	Attraction.find({approved:true},(err,attractions)=>{
		if(err){return res.send(500,'error occurred:database error.')}
		res.json(
			attractions.map((v)=>{
				return {
					name:v.name,
					id:v._id,
					description:v.description,
					location:v.location
				};
			})
		);
	});
});

router.post('/attraction',(req,res)=>{
	let v = new Attraction({
		name:req.body.name,
		description:req.body.description,
		location:{
			lat:req.body.lat,
			lng:req.body.lng
		},
		history:{
			event:'created',
			email:req.body.email,
			date:new Date(),
		},
		approved:false
	});
	v.save((err)=>{
		if(err){return res.send(500,'error occurred:database error.')};
		res.json({
			id:v._id
		});
	});
	console.log(req.body);
});


router.get('/attraction/:id',(req,res)=>{
	Attraction.find({id:req.params.id},(err,v)=>{
		if(err){return res.send(500,'error occurred:database error.');}
		res.json({
			name:v.name,
			id:v._id,
			description:v.description,
			location:v.location
		});
	});
});

module.exports = router;