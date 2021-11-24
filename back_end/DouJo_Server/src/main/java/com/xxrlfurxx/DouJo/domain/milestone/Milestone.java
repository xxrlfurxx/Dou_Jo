package com.xxrlfurxx.DouJo.domain.milestone;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

import com.xxrlfurxx.DouJo.domain.project.Project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@Entity
@IdClass(Milestone.class)
public class Milestone {
	
	@Id
	private long projectId;
	
	private long id;
	
	@ManyToOne
	private Project project;
	
	
	private String Name;
	private String startDate;
	private String endDate;
	
}
