// 함수 생성 (위경도 좌표값을 받아서 해당 위치로 view 를 이동한다)
function gotoMap(x, y) {
    // 1. xy 값을 받아서 알맞은 좌표계 값으로 변환
    var location = ol.proj.transform([x, y], "EPSG:4326", "EPSG:3857");

	// 1-1. select 된 배경 지우기
	
    // 2. 실제 view 이동
    mapView.animate({
        center: location,
		zoom: 15
    });

	// 3. popup 띄우기
	
}
