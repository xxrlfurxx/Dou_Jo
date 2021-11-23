package com.xxrlfurxx.DouJo.domain.milestone;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.xxrlfurxx.DouJo.lib.TextProcesser;

@RestController
public class MilestoneController{
	private MilestoneRepository milestoneRepo;
	private MilestoneService milestoneService;
	
	@Autowired
	public MilestoneController(MilestoneRepository milestoneRepo, MilestoneService milestoneService) {
		this.milestoneRepo = milestoneRepo;
		this.milestoneService = milestoneService;
	}

	@GetMapping(value = "/milestones")
	public List<Milestone> getMilestones() throws InterruptedException{

		return milestoneRepo.findAll(Sort.by("id").ascending());
	}
	@PostMapping(value = "/milestones")
	public Milestone addMilestone(@RequestBody Milestone milestone, HttpServletResponse res) {
		
		if (TextProcesser.isEmpyText(milestone.getName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		if (TextProcesser.isEmpyText(milestone.getStartDate())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		if (TextProcesser.isEmpyText(milestone.getEndDate())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		Milestone milestoneItem = Milestone.builder().id(milestone.getId())
				.name(milestone.getName())
				.startDate(milestone.getStartDate())
				.endDate(milestone.getEndDate())
				.projectId(milestone.getProjectId())				
				.build();

		Milestone milestoneSaved = milestoneRepo.save(milestoneItem);
		
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		milestoneService.sendMilestone(milestoneSaved);
		
		return milestoneSaved;
	}
	@DeleteMapping(value = "/milestones/{id}")
	public boolean removeMilestones(@PathVariable long id, HttpServletResponse res){
	
		Optional<Milestone> milestone = milestoneRepo.findById(id);
		
		if (milestone.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		

		milestoneRepo.deleteById(id);
		
		milestoneService.sendRemoveMilestone(id);
		
		
		return true;
	}

	@PutMapping(value = "/milestones/{id}")
	public Milestone modifyMilestones(@PathVariable long id, @RequestBody Milestone milestone, HttpServletResponse res) throws InterruptedException{

		Optional<Milestone> milestoneItem = milestoneRepo.findById(id);
		
		if (milestoneItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		Milestone milestoneToSave = milestoneItem.get();
		
		milestoneToSave.setId(milestone.getId());
		milestoneToSave.setName(milestone.getName());
		milestoneToSave.setStartDate(milestone.getStartDate());
		milestoneToSave.setEndDate(milestone.getEndDate());
		milestoneToSave.setProjectId(milestone.getProjectId());

		Milestone milestoneToSaved = milestoneRepo.save(milestoneToSave);
		
		milestoneService.sendModifiedMilestone(milestoneToSaved);

		return milestoneToSaved;
	}
}