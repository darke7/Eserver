let express = require('express');
let router = express.Router();
let fs = require('fs');
let formidable = require('formidable');
let dataDir = process.cwd()+'/data';
let usersDir = dataDir+'/users';
fs.existsSync(dataDir)||fs.mkdirSync(dataDir);
fs.existsSync(usersDir)||fs.mkdirSync(usersDir);

router.get('/form',(req,res)=>{
	res.render('users/form');
});

router.post('/upload',(req,res)=>{
	try{
		let form = formidable.IncomingForm();
		form.parse(req,(err,fileds,files)=>{
			let dir = usersDir+'/'+Date.now();
			fs.mkdirSync(dir);
			for(i in files){
				fs.renameSync(files[i].path,dir+'/'+files[i].name);
			}
			res.json({
				msg:'success'
			});
		});
	}catch(err){
		res.json({
			msg:'err'
		});
	}
});

module.exports = router;