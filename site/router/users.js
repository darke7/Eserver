let express = require('express');
let router = express.Router();
let fs = require('fs');
let formidable = require('formidable');
let dataDir = process.cwd()+'/data';
let usersDir = dataDir+'/users';
let ismkdir = (dir)=>{
	fs.existsSync(dir)||fs.mkdirSync(dir);
};
ismkdir(dataDir);
ismkdir(usersDir);

router.get('/uploadfile-form',(req,res)=>{
	res.render('users/uploadfile-form');
});

router.get('/thank-you',(req,res)=>{
	res.render('users/thank-you');
});

router.get('/registered-form',(req,res)=>{
	res.render('users/registered-form');
});



router.post('/newsletter',(req,res)=>{
	if(req.body.name&&req.body.email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)){
		req.session.flash = {
			type:'success',
			intro:'registration success！',
			message:"Your password is '5415rs._s'."
		}
		res.redirect(303,'thank-you');
	}else{
		req.session.flash = {
			type:'danger',
			intro:'registration fail！',
			message:"Please enter the correct name and email address."
		}
		res.redirect(303,'registered-form');
	}

});

router.post('/upload',(req,res)=>{
	try{
		let form = formidable.IncomingForm();
		form.maxFileSize = 400 * 200 * 1024 * 1024;
		form.parse(req,(err,fileds,files)=>{
			var file = files.file||'';
			if(file){
				let dir = usersDir+'/id33183df';
				ismkdir(dir);
				fs.renameSync(file.path,dir+'/'+file.name);
				res.json({
					msg:'success',
					filename:file.name
				});
			}else{
				res.json({
					msg:'not found file!'
				});
			}
		});
	}catch(err){
		console.error(err);
		res.json({
			msg:'err'
		});
	}
});


module.exports = router;