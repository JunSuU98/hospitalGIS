const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(), // WFS 형식의 요청으로 geoserver 데이터를 받아온다
    }),
  ],
});

var mapView = new ol.View({
    center: ol.proj.fromLonLat([126.99686910698, 35.55713944812743]),
    zoom: 7,
})

map.setView(mapView)

/**
 * 텍스트 라벨 생성
 */
var labelStyle = new ol.style.Style({
  geometry: function(feature) {
    var geometry = feature.getGeometry();
    if (geometry.getType() == 'MultiPolygon') {
      // Only render label for the widest polygon of a multipolygon
      var polygons = geometry.getPolygons();
      var widest = 0;
      for (var i = 0, ii = polygons.length; i < ii; ++i) {
        var polygon = polygons[i];
        var width = ol.extent.getWidth(polygon.getExtent());
        if (width > widest) {
          widest = width;
          geometry = polygon;
        }
      }
    }
    return geometry;
  },
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    overflow: true,
    fill: new ol.style.Fill({
      color: '#000'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 3
    })
  })
});

var areaStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.6)'
  }),
  stroke: new ol.style.Stroke({
    color: '#319FD3',
    width: 1
  })
});

var style = [areaStyle, labelStyle];

var sidoVectorSource = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
    loader: function(extent, resolution, projection){
      var url = 'http://localhost:8088/geoserver/wfs?service=WFS' +
        '&version=1.0.0&request=GetFeature&typeNames=hospitalGIS:ctprvn' + 
        '&outputFormat=application/json&srsname=EPSG:3857' +
        '&bbox=' + extent.join(',') + ',' + 'EPSG:3857';

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      var onError = function(){
        vectorSource.removeLoadedExtent(extent);
      }
      xhr.onerror = onError;
      xhr.onload = function(){
        if(xhr.status == 200){
          sidoVectorSource.addFeatures(sidoVectorSource.getFormat().readFeatures(xhr.responseText));
        } else {
          onError();
        }
      }
      xhr.send();
    },
    strategy: ol.loadingstrategy.bbox
});

var sidoVectorLayer = new ol.layer.Vector({
	source: sidoVectorSource,
  style: function(feature){
    labelStyle.getText().setText(feature.get('ctp_kor_nm'));
    return style;
  },
  declutter: true,
  serverType: 'geoserver'
});

var sggVectorSource = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
    loader: function(extent, resolution, projection){
      var url = 'http://localhost:8088/geoserver/wfs?service=WFS' +
        '&version=1.0.0&request=GetFeature&typeNames=hospitalGIS:sig' + 
        '&outputFormat=application/json&srsname=EPSG:3857' +
        '&bbox=' + extent.join(',') + ',' + 'EPSG:3857';

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      var onError = function(){
        vectorSource.removeLoadedExtent(extent);
      }
      xhr.onerror = onError;
      xhr.onload = function(){
        if(xhr.status == 200){
          sggVectorSource.addFeatures(sggVectorSource.getFormat().readFeatures(xhr.responseText));
        } else {
          onError();
        }
      }
      xhr.send();
    },
    strategy: ol.loadingstrategy.bbox
});

var sggVectorLayer = new ol.layer.Vector({
	source: sggVectorSource,
  style: function(feature){
    labelStyle.getText().setText(feature.get('sig_kor_nm'));
	areaStyle.getFill().setColor([238, 253, 252, 0.5]);
	areaStyle.getStroke().setColor([80, 220, 212, 1]);
    return style;
  },
  declutter: true,
  serverType: 'geoserver'
});

var emdVectorSource = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
    loader: function(extent, resolution, projection){
      var url = 'http://localhost:8088/geoserver/wfs?service=WFS' +
        '&version=1.0.0&request=GetFeature&typeNames=hospitalGIS:emd' + 
        '&outputFormat=application/json&srsname=EPSG:3857' +
        '&bbox=' + extent.join(',') + ',' + 'EPSG:3857';

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      var onError = function(){
        vectorSource.removeLoadedExtent(extent);
      }
      xhr.onerror = onError;
      xhr.onload = function(){
        if(xhr.status == 200){
          emdVectorSource.addFeatures(emdVectorSource.getFormat().readFeatures(xhr.responseText));
        } else {
          onError();
        }
      }
      xhr.send();
    },
    strategy: ol.loadingstrategy.bbox
});

var emdVectorLayer = new ol.layer.Vector({
	source: emdVectorSource,
	style: function(feature){
		labelStyle.getText().setText(feature.get('emd_kor_nm'));
		areaStyle.getFill().setColor([255, 222, 222, 0.5]);
		areaStyle.getStroke().setColor([254, 112, 112, 1]);
		return style;
	},
  declutter: true,
  serverType: 'geoserver'
});

var liVectorSource = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
    loader: function(extent, resolution, projection){
      var url = 'http://localhost:8088/geoserver/wfs?service=WFS' +
        '&version=1.0.0&request=GetFeature&typeNames=hospitalGIS:li' + 
        '&outputFormat=application/json&srsname=EPSG:3857' +
        '&bbox=' + extent.join(',') + ',' + 'EPSG:3857';

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      var onError = function(){
        vectorSource.removeLoadedExtent(extent);
      }
      xhr.onerror = onError;
      xhr.onload = function(){
        if(xhr.status == 200){
          liVectorSource.addFeatures(liVectorSource.getFormat().readFeatures(xhr.responseText));
        } else {
          onError();
        }
      }
      xhr.send();
    },
    strategy: ol.loadingstrategy.bbox
});

var liVectorLayer = new ol.layer.Vector({
	source: liVectorSource,
	style: function(feature){
		labelStyle.getText().setText(feature.get('li_kor_nm'));
		areaStyle.getFill().setColor([239, 207, 255, 0.5]);
		areaStyle.getStroke().setColor([207, 133, 242, 1]);
		return style;
	},
  declutter: true,
  serverType: 'geoserver'
});

var hospitalVectorSource = new ol.source.Vector({
	attributions: ["hospitalVector"],
	format: new ol.format.GeoJSON(),
    loader: function(extent, resolution, projection){
      var url = 'http://localhost:8088/geoserver/wfs?service=WFS' +
        '&version=1.0.0&request=GetFeature&typeNames=hospitalGIS:hospital' + 
        '&outputFormat=application/json&srsname=EPSG:3857' +
        '&bbox=' + extent.join(',') + ',' + 'EPSG:3857';

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      var onError = function(){
        vectorSource.removeLoadedExtent(extent);
      }
      xhr.onerror = onError;
      xhr.onload = function(){
        if(xhr.status == 200){
          hospitalVectorSource.addFeatures(hospitalVectorSource.getFormat().readFeatures(xhr.responseText));
        } else {
          onError();
        }
      }
      xhr.send();
    },
    strategy: ol.loadingstrategy.bbox,
});

var hospitalVectorLayer = new ol.layer.Vector({
	source: hospitalVectorSource,
	serverType: 'geoserver'
});

$('#sido-chk').on('click', function(){
  if($('#sido-chk').is(':checked')){ // click 을 한 이후에 check 가 된다
    console.log('sido checked')
    map.addLayer(sidoVectorLayer)
  } else {
    console.log('sido blank')
    map.removeLayer(sidoVectorLayer)
  }

});

$('#sgg-chk').on('click', function(){
  if($('#sgg-chk').is(':checked')){ // click 을 한 이후에 check 가 된다
    console.log('sgg checked')
    map.addLayer(sggVectorLayer)
  } else {
    console.log('sgg blank')
    map.removeLayer(sggVectorLayer)
  }

});

$('#emd-chk').on('click', function(){
  if($('#emd-chk').is(':checked')){ // click 을 한 이후에 check 가 된다
    console.log('emd checked')
    map.addLayer(emdVectorLayer)
  } else {
    console.log('emd blank')
    map.removeLayer(emdVectorLayer)
  }

});

$('#li-chk').on('click', function(){
  if($('#li-chk').is(':checked')){ // click 을 한 이후에 check 가 된다
    console.log('li checked')
    map.addLayer(liVectorLayer)
  } else {
    console.log('li blank')
    map.removeLayer(liVectorLayer)
  }

});

$('#hospital-chk').on('click', function(){
  if($('#hospital-chk').is(':checked')){ // click 을 한 이후에 check 가 된다
    console.log('hospital checked')
    map.addLayer(hospitalVectorLayer)
  } else {
    console.log('hospital blank')
    map.removeLayer(hospitalVectorLayer)
  }

});

var selectClick = new ol.interaction.Select({
	condition: ol.events.condition.click,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
            color: "red",
            width: 2
        }),
	}),
})

map.addInteraction(selectClick);

selectClick.on('select', function(e){ //click 을 통한 select 가 일어났을 때 동작
	console.log(e.selected)
	
	var clickedArea = '';
	
	if(e.selected[0] == undefined){; // 병원 레이어를 키고 병원이 아닌 일반 지역을 선택했을 때 오류처리
		return false;
	}
	
	// 체크박스의 체크 여부에 따라서 input 에 넣는 값의 이름이 달라져야한다 아니면 undefined 로 조건 검사
	if(e.selected[0].values_.ctp_kor_nm != undefined){
		clickedArea = e.selected[0].values_.ctp_kor_nm;
	} else if (e.selected[0].values_.sig_kor_nm != undefined){
		clickedArea = e.selected[0].values_.sig_kor_nm;
	} else if (e.selected[0].values_.emd_kor_nm != undefined){
		clickedArea = e.selected[0].values_.emd_kor_nm;
	} else if (e.selected[0].values_.li_kor_nm != undefined){
		clickedArea = e.selected[0].values_.li_kor_nm;
	} else { 
		clickedArea = 'notClicked';
	}
	
	$('#map-click').val(clickedArea);

  // 병원 클릭 시 팝업
  if (e.selected[0].values_.enc_hosp_cd != undefined) {

    let x = Number(e.selected[0].values_.coord_x) // string 으로 값을 가져오기 때문에 정상적인 변환을 위해서 number 로 변환한다
    let y = Number(e.selected[0].values_.coord_y)

    let location = ol.proj.transform([x, y], "EPSG:4326", "EPSG:3857");

	if(e.selected[0].values_.web_url == null){
		e.selected[0].values_.web_url = "";
	}
	if(e.selected[0].values_.tel_no == null){
		e.selected[0].values_.tel_no = "";
	}

    // 팝업을 띄운다
    popupContent.innerHTML = `
        <div>${e.selected[0].values_.hosp_nm}</div>
        <div>${e.selected[0].values_.addr}</div>
        <div>${e.selected[0].values_.inst_nm}</div>
        <div>${e.selected[0].values_.tel_no}</div>
        <div>
          <a href='${e.selected[0].values_.web_url}' target="_blank">${e.selected[0].values_.web_url}</a>
        </div>
      `
      popupOverlay.setPosition(location);

  }
})

