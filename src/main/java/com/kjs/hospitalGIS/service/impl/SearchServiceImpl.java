package com.kjs.hospitalGIS.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.kjs.hospitalGIS.VO.ResultVO;
import com.kjs.hospitalGIS.VO.SearchVO;
import com.kjs.hospitalGIS.mapper.SearchMapper;
import com.kjs.hospitalGIS.service.SearchService;

@Service(value = "searchService")
public class SearchServiceImpl implements SearchService{

	@Resource(name = "searchMapper")
	private SearchMapper searchMapper;

	@Override
	public List<ResultVO> search(SearchVO searchVO) {
		
		return searchMapper.search(searchVO);
		
	}
	
	

}
