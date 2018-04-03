let express = require('express');
let router = express.Router();

router.get('/epic-fail',(req,res)=>{
	process.nextTick(()=>{
		throw new Error('Worker died');
	});
});

router.get('/fail',()=>{
	throw new Error('nope');
});

router.get('/add-attraction',(req,res)=>{
	res.render('test/add-attraction');
})
module.exports = router;