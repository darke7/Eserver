let mongoose = require('mongoose');
let config = require('../config/config.js');
mongoose.connect(config.mongo);

mongoose.connection.on('connected',()=>{
	console.log('database connection successded!');
});

mongoose.connection.on('error',(err)=>{
	console.log('databarse connection failed!');
});

mongoose.connection.on('disconnected',()=>{
	console.log('database connection disconnected!');
});

module.exports = mongoose;