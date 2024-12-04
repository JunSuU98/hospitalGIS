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
<link rel="stylesheet" href="<c:url value='/css/hospitalGIS/main.css' />">
</head>
<body>
	hospital GIS
	
	<div id="container">
		<div id="map" style="height: 80vh; width: 60vw;">
		</div> 

		<form id="search-form" action="" method="get">
			<div id="buttons">
				<input type="checkbox" id="sido-chk"></input>
				<label for="sido-chk">시도</label>
				<input type="checkbox" id="sgg-chk"></input>
				<label for="sgg-chk">시군구</label>
				<input type="checkbox" id="emd-chk"></input>
				<label for="emd-chk">읍면동</label>
				<input type="checkbox" id="li-chk"></input>
				<label for="li-chk">리</label>
				<input type="checkbox" id="hospital-chk"></input>
				<label for="hospital-chk">병원보기</label>
			</div>
			
			<div id="searchDiv">
				<label>
					<label for="filter">검색옵션</label>
					<select name="filter" id="searchFilter">
						<option value="hospitalName">병원이름</option>
						<option value="sido">시도</option>
						<option value="sgg">시군구</option>
						<option value="emd">읍면동</option>
						<option value="ri">리</option>
					</select>
				</label>
				<input type="hidden" id="map-click" name="map-click">
				<input type="text" name="query">
				<button type="submit">search</button>
			</div>
			
			<div id="resultDiv">
				<ul id="resultUl">
					<li>test</li>
				</ul>
			</div>
		</form>

	</div>
	

	
</body>
</html>