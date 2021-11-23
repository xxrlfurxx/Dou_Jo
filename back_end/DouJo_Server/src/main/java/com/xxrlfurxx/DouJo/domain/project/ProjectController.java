package com.xxrlfurxx.DouJo.domain.project;

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
public class ProjectController {
	private ProjectRepository projectRepo;
	private ProjectService projectService;
	
	@Autowired
	public ProjectController(ProjectRepository projectRepo, ProjectService projectService) {
		this.projectRepo = projectRepo;
		this.projectService = projectService;
	}

	@GetMapping(value = "/projects")
	public List<Project> getProjects() throws InterruptedException{
		return projectRepo.findAll(Sort.by("id").ascending());
	}
	
	@PostMapping(value = "/projects")
	public Project addProject(@RequestBody Project project, HttpServletResponse res) {
		
		if (TextProcesser.isEmpyText(project.getProjectName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		if (TextProcesser.isEmpyText(project.getStartDate())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		if (TextProcesser.isEmpyText(project.getEndDate())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		Project projectItem = Project.builder().id(project.getId())
				.projectName(project.getProjectName())
				.startDate(project.getStartDate())
				.endDate(project.getEndDate())
				.manager(project.getManager())
				.engineer(project.getEngineer())
				.memo(project.getMemo())				
				.build();

		Project projectSaved = projectRepo.save(projectItem);
		
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		projectService.sendProject(projectSaved);
		
		return projectSaved;
	}
	@DeleteMapping(value = "/projects/{id}")
	public boolean removeProjects(@PathVariable long id, HttpServletResponse res){
	
		Optional<Project> project = projectRepo.findById(id);
		if (project.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		projectRepo.deleteById(id);

		projectService.sendRemoveProject(id);
		
		return true;
	}

	@PutMapping(value = "/projects/{id}")
	public Project modifyProjects(@PathVariable long id, @RequestBody Project project, HttpServletResponse res) throws InterruptedException{

		Optional<Project> projectItem = projectRepo.findById(id);
		
		if (projectItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		Project projectToSave = projectItem.get();
		
		projectToSave.setId(project.getId());
		projectToSave.setProjectName(project.getProjectName());
		projectToSave.setStartDate(project.getStartDate());
		projectToSave.setEndDate(project.getEndDate());
		projectToSave.setManager(TextProcesser.getPlainText(project.getManager()));
		projectToSave.setEngineer(TextProcesser.getPlainText(project.getEngineer()));
		projectToSave.setMemo(project.getMemo());

		Project projectToSaved = projectRepo.save(projectToSave);

		projectService.sendModifiedProject(projectToSaved);

		return projectToSaved;
	}
}