let express = require('express');
let router = express.Router();
let fortune = require('../lib/fortune.js');

router.get('/fortune',(req,res)=>{
	res.json({
		fortune:fortune()
	});
});

module.exports = router;