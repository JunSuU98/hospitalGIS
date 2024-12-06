<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>병원 위치 조회 서비스</title>
<script src="<c:url value='/assets/js/plugins.min.js?${System.currentTimeMillis()}'/>"></script>
<script defer src="<c:url value='/js/main.js'/>"></script>
<script defer src="<c:url value='/js/search.js'/>"></script>
<script defer src="<c:url value='/js/move.js'/>"></script>
<script defer src="<c:url value='/js/popup.js'/>"></script>
<link rel="stylesheet" href="<c:url value='/css/hospitalGIS/bootstrap.css' />">
<link rel="stylesheet" href="<c:url value='/css/hospitalGIS/main.css' />">
</head>
<body>
	hospital GIS
	
	<div id="container">
		<!-- map -->
		<div id="map" style="height: 80vh; width: 60vw;"></div> 

		<!-- popup -->
		<div id="popup" class="ol-popup">
			<a href="#" id="popup-closer" class="ol-popup-closer"></a>
			<div id="popup-content"></div>
		</div>

		<form id="search-form" action="" method="get">
			<div id="chkbox-div">
				<input type="checkbox" id="sido-chk" value="sido"></input>
				<label for="sido-chk">시도</label>
				<input type="checkbox" id="sgg-chk" value="sgg"></input>
				<label for="sgg-chk">시군구</label>
				<input type="checkbox" id="emd-chk" value="emd"></input>
				<label for="emd-chk">읍면동</label>
				<input type="checkbox" id="li-chk" value="li"></input>
				<label for="li-chk">리</label>
				<input type="checkbox" id="hospital-chk" value="hospital"></input>
				<label for="hospital-chk">병원보기</label>
			</div>
			
			<div id="searchDiv">
				<label>
					<label for="filter">검색옵션</label>
					<select name="filter" id="search-filter">
						<option value="hospitalName">병원이름</option>
						<option value="instNm">병원구분</option>
						<option value="addr">주소</option>
					</select>
				</label>
				<input type="hidden" id="map-click" name="map-click">
				<input type="text" name="query" id="search-query">
				<button type="submit">search</button>
			</div>
			
			<div id="resultDiv">
				<table class="table table-striped" id="resultTable">
					<thead id="resultHead">
						<tr>
							<th>번호</th>
							<th>병원 이름</th>
							<th>주소</th>
							<th>구분</th>
							<th>전화번호</th>
							<th>웹사이트</th>
							<th>위치</th>
						</tr>
					</thead>
					<tbody id="resultBody">

					</tbody>
				</table>
			</div>
		</form>

	</div>
	

	
</body>
</html>