$(function(){
	var fortuneTemplate = new Handlebars.compile($('#fortuneTemplate').html());
	var fortune = $('#fortune');
	$.ajax('api.127.0.0.1:8080/fortune',{
		success:function(data){
			if(data){
				fortune.html(fortuneTemplate(data));
			}
		}
	});
	
});