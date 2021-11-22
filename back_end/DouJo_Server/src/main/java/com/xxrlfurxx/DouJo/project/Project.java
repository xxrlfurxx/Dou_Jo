package com.xxrlfurxx.DouJo.project;

import java.util.List;

import com.xxrlfurxx.DouJo.project.milestone.Milestone;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Project {
	private long id;
	private String projectname;
	private String startdate;
	private String enddate;
	private String manager;
	private String engineer;
	private String memo;
	private List<Milestone> milestone;
}
