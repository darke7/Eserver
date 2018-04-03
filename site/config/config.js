let credentials = require('../credentials.js');
let config = {
	$salt:credentials.cookieSecret,
	env:'production',
	email:{
		user:credentials.email.user,
		pass:credentials.email.pass
	},
	mongo:credentials.mongo.development,
	// administrator list
	admin:credentials.admin,
	cors:credentials.cors,
	port:'8080',
	cors:true
}

module.exports = config;