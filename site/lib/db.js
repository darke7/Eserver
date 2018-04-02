let mongoose = require('mongoose');
let credentials = require('../credentials.js');
mongoose.connect(credentials.mongo.development);

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