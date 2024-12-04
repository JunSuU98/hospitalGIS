package com.kjs.hospitalGIS.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HospitalController {
	
	@GetMapping("/home.do")
	public String hospitalMain() {
		return "main/homepage";
	}

}
