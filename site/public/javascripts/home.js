$(function(){
	var fortuneTemplate = new Handlebars.compile($('#fortuneTemplate').html());
	var fortune = $('#fortune');
	$.ajax('/api/fortune',{
		success:function(data){
			if(data){
				fortune.html(fortuneTemplate(data));
			}
		}
	});
	
});