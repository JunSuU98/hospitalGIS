package com.kjs.hospitalGIS.mapper;

import java.util.List;

import com.kjs.hospitalGIS.VO.ResultVO;
import com.kjs.hospitalGIS.VO.SearchVO;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper(value = "searchMapper")
public interface SearchMapper {
	
	public List<ResultVO> search(SearchVO searchVO);
	
}
