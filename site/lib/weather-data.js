let weatherRouter = (req,res,next)=>{
	if(!res.locals.partials){
		res.locals.partials = {};
	}
	res.locals.partials.weather = getWeather();
	next();
};

let getWeather = ()=>{
	return {
		locations:[
			{
				name:'Beijing',
				weather:'fine',
				hot:'36°'
			},
			{
				name:'London',
				weather:'cloudy',
				hot:'26°'
			},
			{
				name:'Aegean',
				weather:'rain',
				hot:'22°'
			},
			{
				name:'Sydney',
				weather:'fine',
				hot:'30°'
			},
		]
	};
};

module.exports = weatherRouter;