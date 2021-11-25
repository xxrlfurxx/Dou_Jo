package com.xxrlfurxx.DouJo.domain.milestone;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
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
public class Milestone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
//	@ManyToOne
//	@JoinColumn(name="projectId")
	private long projectId;	
	private String name;
	private String startDate;
	private String endDate;
}
