// 함수 생성 (위경도 좌표값을 받아서 해당 위치로 view 를 이동한다)
function gotoMap(x, y, data) {
	const res = JSON.parse(data.dataset.value);

    // 1. xy 값을 받아서 알맞은 좌표계 값으로 변환
    let location = ol.proj.transform([x, y], "EPSG:4326", "EPSG:3857");

    // 2. 실제 view 이동
    mapView.animate({
        center: location,
		zoom: 15
    });

	// 3. popup 띄우기 (hospitalVectorLayer 가 없는 경우에만 map 에 추가한다)
	$('#hospital-chk').prop('checked', true)
	
		// 3-1. hospitalVectorLayer 유무 확인에 따른 레이어 추가
	let isHospitalLayer = false;
	for(let i = 0; i < map.getLayers().values_.length; i++){
		let layer = map.getLayers().array_[i]
		let attribution = layer.getSource().getAttributions();

		if(attribution != null){
			if(attribution[0].html_ == 'hospitalVector'){
				isHospitalLayer = true
			} 
		}
	}
	
	if(!isHospitalLayer){ // hospitalVectorLayer 가 없는 경우에만 map 에 추가한다
		map.addLayer(hospitalVectorLayer)
	}
	
		// 3-2. popup 
    popupContent.innerHTML = `
		<div>${res.hospNm}</div>
		<div>${res.addr}</div>
		<div>${res.instNm}</div>
		<div>${res.telNo}</div>
		<div>
			<a href='${res.webUrl}' target="_blank">${res.webUrl}</a>
		</div>
	`
    popupOverlay.setPosition(location);
}
