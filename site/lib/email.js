let credentials = require('../credentials.js');
let nodemailer = require('nodemailer');
let mailTransport = nodemailer.createTransport({
	service:'qq',
	auth:{
		user:credentials.email.user,
		pass:credentials.email.pass
	}
});

let sendEmail = (to,title,body)=>{
	mailTransport.sendMail({
		from:`"Eserver" <${credentials.email.user}>`,
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