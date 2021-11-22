package com.xxrlfurxx.DouJo.project;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {
	private ProjectService projectService;

	// ConcurrentSkipListMap Ű �������� ������ �Ǿ�����
	private SortedMap<Long, Project> projects = Collections
			.synchronizedSortedMap(new TreeMap<Long, Project>(Collections.reverseOrder()));

	// id�� ������ ����� ����
	private AtomicLong maxId = new AtomicLong();

	// project �����ȸ
	// GET /projects
	@GetMapping(value = "/projects")
	public List<Project> getProjects() {
		// �ʰ� ���
		return new ArrayList<Project>(projects.values());
	}

	// project 1�� �߰�
	// POST /projects
	@PostMapping(value = "/projects")
	public Project addProject(@RequestBody Project project, HttpServletRequest req, HttpServletResponse res) {

		if (project.getProjectname() == null || project.getProjectname().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			return null;
		}

		if (project.getProjectname() == null || project.getStartdate().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (project.getProjectname() == null || project.getEnddate().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// id���� ����
		Long ccurrentId = maxId.incrementAndGet();

		// �Է¹��� �����ͷ� project��ü�� ����
		// id���� �������� ������ ������ ó����
		Project projectItem = Project.builder().id(ccurrentId).projectname(project.getProjectname())
				.startdate(project.getStartdate()).enddate(project.getEnddate()).manager(project.getManager())
				.engineer(project.getManager()).memo(project.getMemo()).build();

		// project ��ϰ�ü �߰�
		projects.put(ccurrentId, projectItem);

		// ���ҽ� ������
		// res.setStatus(201);
		if (res != null) {
			res.setStatus(HttpServletResponse.SC_CREATED);
		}
//		projectService.sendProject(projectItem);
		// �߰��� ��ü�� ��ȯ
		return projectItem;
	}

	// project 1�� ����
	// DELETE /projects/1
	@DeleteMapping(value = "projects/{id}")
	public boolean removeProject(@PathVariable long id, HttpServletResponse res) {
		// �ش� id�� ������ 1���� ������
		Project project = projects.get(Long.valueOf(id));
		// �ش� id�� �����Ͱ� ������
		if (project == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// ���� ����
		projects.remove(Long.valueOf(id));

		projectService.sendRemoveProject(id);
		return true;

	}

	// project 1�� ����
	// PUT /projects/1
	@PutMapping(value = "projects/{id}")
	public Project modifyProject(@PathVariable long id, @RequestBody Project project, HttpServletResponse res) {
		// �ش� id�� ������ 1���� ������
		Project findItem = projects.get(Long.valueOf(id));
		// �ش� id�� �����Ͱ� ������
		if (findItem == null) {

			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		if (project.getProjectname() == null || project.getProjectname().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (project.getStartdate() == null || project.getStartdate().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (project.getEnddate() == null || project.getEnddate().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// ������ ����
		findItem.setProjectname(project.getProjectname());
		findItem.setStartdate(project.getStartdate());
		findItem.setEnddate(project.getEnddate());
		findItem.setManager(project.getManager());
		findItem.setEngineer(project.getEngineer());
		findItem.setMemo(project.getMemo());

		projectService.sendModifiedProject(findItem);
		return findItem;
	}
}