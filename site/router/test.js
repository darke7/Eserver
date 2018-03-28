let express = require('express');
let router = express.Router();

router.get('/epic-fail',(req,res)=>{
	process.nextTick(()=>{
		throw new Error('Worker died');
	});
});

module.exports = router;