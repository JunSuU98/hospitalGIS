package com.kjs.hospitalGIS.service;

import java.util.List;

import com.kjs.hospitalGIS.VO.ResultVO;
import com.kjs.hospitalGIS.VO.SearchVO;

public interface SearchService {

	public List<ResultVO> search(SearchVO searchVO);
	
}
