package com.xxrlfurxx.DouJo.domain.project;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.xxrlfurxx.DouJo.domain.milestone.Milestone;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String projectName;
	private String startDate;
	private String endDate;
	private String manager;
	private String engineer;
	private String memo;
	
	@OneToMany
	@JoinColumn(name="projectId")
	private List<Milestone> milestone;
}