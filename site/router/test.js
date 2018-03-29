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

module.exports = router;