let config = require('../config/config.js');
let baseUrl = config.baseUrl;

module.exports = (name)=>{
	return baseUrl+name;
}