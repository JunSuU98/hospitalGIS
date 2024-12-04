$('#search-form').submit(function(){

	$.ajax({
		type: 'get',
		url: '/search',
		dataType: 'text',
		success: function(res){

		},
		error: function(error){
		
		}
	});

});