let credentials = require('../credentials.js');
let config = {
	$salt:credentials.cookieSecret,
	env:'development',
	email:{
		user:credentials.email.user,
		pass:credentials.email.pass
	},
	mongo:credentials.mongo.development,
	// administrator list
	admin:credentials.admin
}

module.exports = config;