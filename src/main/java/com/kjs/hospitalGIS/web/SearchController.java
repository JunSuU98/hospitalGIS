package com.kjs.hospitalGIS.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SearchController {
	
	@GetMapping(value = "/search")
	public String searchHospital(@RequestParam("map-click") String mapClick, @RequestParam("query") String query) {
		
		return "";
	}

}
