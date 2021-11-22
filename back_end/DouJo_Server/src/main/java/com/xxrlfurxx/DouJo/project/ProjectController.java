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

	// ConcurrentSkipListMap 키 기준으로 정렬이 되어있음
	private SortedMap<Long, Project> projects = Collections
			.synchronizedSortedMap(new TreeMap<Long, Project>(Collections.reverseOrder()));

	// id값 생성에 사용할 변수
	private AtomicLong maxId = new AtomicLong();

	// project 목록조회
	// GET /projects
	@GetMapping(value = "/projects")
	public List<Project> getProjects() {
		// 맵값 목록
		return new ArrayList<Project>(projects.values());
	}

	// project 1건 추가
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

		// id값을 생성
		Long ccurrentId = maxId.incrementAndGet();

		// 입력받은 데이터로 project객체를 생성
		// id값은 서버에서 생성한 것으로 처리함
		Project projectItem = Project.builder().id(ccurrentId).projectname(project.getProjectname())
				.startdate(project.getStartdate()).enddate(project.getEnddate()).manager(project.getManager())
				.engineer(project.getManager()).memo(project.getMemo()).build();

		// project 목록객체 추가
		projects.put(ccurrentId, projectItem);

		// 리소스 생성됨
		// res.setStatus(201);
		if (res != null) {
			res.setStatus(HttpServletResponse.SC_CREATED);
		}
//		projectService.sendProject(projectItem);
		// 추가된 객체를 반환
		return projectItem;
	}

	// project 1건 삭제
	// DELETE /projects/1
	@DeleteMapping(value = "projects/{id}")
	public boolean removeProject(@PathVariable long id, HttpServletResponse res) {
		// 해당 id의 데이터 1건을 가져옴
		Project project = projects.get(Long.valueOf(id));
		// 해당 id의 데이터가 없으면
		if (project == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// 삭제 수행
		projects.remove(Long.valueOf(id));

		projectService.sendRemoveProject(id);
		return true;

	}

	// project 1건 수정
	// PUT /projects/1
	@PutMapping(value = "projects/{id}")
	public Project modifyProject(@PathVariable long id, @RequestBody Project project, HttpServletResponse res) {
		// 해당 id의 데이터 1건을 가져옴
		Project findItem = projects.get(Long.valueOf(id));
		// 해당 id의 데이터가 없으면
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

		// 데이터 변경
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