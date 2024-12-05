package com.kjs.hospitalGIS.web;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kjs.hospitalGIS.VO.ResultVO;
import com.kjs.hospitalGIS.VO.SearchVO;
import com.kjs.hospitalGIS.service.SearchService;

@Controller
public class SearchController {
	
	@Resource(name = "searchService")
	private SearchService searchService;
	
	@ResponseBody
	@GetMapping(value = "/search.do")
	public List<ResultVO> searchHospital(@RequestParam(value = "mapClick", required = false) String mapClicked,
			@RequestParam("filter") String filter,
			@RequestParam(value = "query") String query) {
		
		SearchVO searchVO = new SearchVO();
		searchVO.setMapClicked(mapClicked);
		searchVO.setFilter(filter);
		searchVO.setQuery(query);

		searchService.search(searchVO);
		
		return searchService.search(searchVO);
	}

}
