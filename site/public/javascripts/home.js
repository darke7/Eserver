$(function(){
	var fortuneTemplate = new Handlebars.compile($('#fortuneTemplate').html());
	var fortune = $('#fortune');
	$.ajax('/fortune',{
		success:function(data){
			if(data){
				fortune.html(fortuneTemplate(data));
			}
		}
	});
	
});