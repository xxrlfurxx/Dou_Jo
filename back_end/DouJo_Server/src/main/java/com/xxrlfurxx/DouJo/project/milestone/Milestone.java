package com.xxrlfurxx.DouJo.project.milestone;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Milestone {
	private long id;
	private String name;
	private String startdate;
	private String enddate;
	private long projectId;
	
}
