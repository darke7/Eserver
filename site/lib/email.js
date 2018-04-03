let config = require('../config/config.js');
let nodemailer = require('nodemailer');
let mailTransport = nodemailer.createTransport({
	service:'qq',
	auth:{
		user:config.email.user,
		pass:config.email.pass
	}
});

let sendEmail = (to,title,body)=>{
	mailTransport.sendMail({
		from:`"Eserver" <${config.email.user}>`,
		to,
		subject:title,
		html:body,
		generateTextFromHtml:true
	},
	(err)=>{
		console.error(err);
	});
};

module.exports = sendEmail;