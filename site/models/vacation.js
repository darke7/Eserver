let mongoose = require('mongoose');

let vacationSchema = mongoose.Schema({
	name:String,
	price:Number
});

vacationSchema.virtual('displayPrice').get(function(){ 
    return '$'+(this.price/100).toFixed(2);
});

vacationSchema.methods.getDisplayPrice = function () {
    return '$'+(this.price/100).toFixed(2);
}

let Vacation = mongoose.model('Vacation',vacationSchema,'address');
module.exports = Vacation;