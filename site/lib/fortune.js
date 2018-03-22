let fortunes = [
	'The river is derived from spring water.',
	"Don't be afraid of things you don't know.",
	'Failure is to lose confidence.',
	'The true intelligence is the will of fortitude.',
	'You will have a surprise!'
];

module.exports = ()=>{
	let x = Math.floor(Math.random()*fortunes.length);
	return fortunes[x];
};