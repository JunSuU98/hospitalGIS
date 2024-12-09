$('#search-form').on("submit", function(event){
	event.preventDefault();

	$.ajax({
		type: 'get',
		url: '/search.do',
		dataType: 'json',
		data: {
			mapClick: $('#map-click').val(),
			filter: $('#search-filter').val(),
			query: $('#search-query').val()
		},
		success: function(res){
			console.log(res)
			console.log(res.length)
			// loop 를 통해서 table 을 그린다
			$('#resultBody').empty();
			for(i = 0; i < res.length; i++){
			
				if(res[i].webUrl == null){
					res[i].webUrl = "";
				}
				if(res[i].telNo == null){
					res[i].telNo = "";
				}

				let html = `
					<tr>
						<td>${i+1}</td>
						<td>${res[i].hospNm}</td>
						<td>${res[i].addr}</td>
						<td>${res[i].instNm}</td>
						<td>${res[i].telNo}</td>
						<td><a href=${res[i].webUrl} target="_blank">${res[i].webUrl}</a></td>
						<td>
							<button type="button" id=${res[i].encHospCd} onclick="gotoMap(${res[i].coordX}, ${res[i].coordY}, this)" data-value='${JSON.stringify(res[i])}'>location</button>
						</td>
					</tr>
				`

				$('#resultBody').append(html)
			}
		},
		error: function(error){
			console.log(error)
		}
	});

});

