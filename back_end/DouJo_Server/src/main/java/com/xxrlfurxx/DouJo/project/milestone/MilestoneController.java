package com.xxrlfurxx.DouJo.project.milestone;

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
public class MilestoneController {
//	private MilestoneService milestoneService;

	// ConcurrentSkipListMap 키 기준으로 정렬이 되어있음
	private SortedMap<Long, Milestone> milestones = Collections
			.synchronizedSortedMap(new TreeMap<Long, Milestone>(Collections.reverseOrder()));

	// id값 생성에 사용할 변수
	private AtomicLong maxId = new AtomicLong();

	// project 목록조회
	// GET /projects
	@GetMapping(value = "/milestones")
	public List<Milestone> getProjects() {
		// 맵값 목록
		return new ArrayList<Milestone>(milestones.values());
	}

	// project 1건 추가
	// POST /projects
	@PostMapping(value = "/milestones")
	public Milestone addMilestone(@RequestBody Milestone milestone, HttpServletRequest req, HttpServletResponse res) {

		if (milestone.getName() == null || milestone.getName().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);

			return null;
		}

		if (milestone.getStartdate() == null || milestone.getStartdate().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (milestone.getEnddate() == null || milestone.getEnddate().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// id값을 생성
		Long ccurrentId = maxId.incrementAndGet();

		// 입력받은 데이터로 project객체를 생성
		// id값은 서버에서 생성한 것으로 처리함
		Milestone milestoneItem = Milestone.builder().id(ccurrentId).name(milestone.getName())
				.startdate(milestone.getStartdate()).enddate(milestone.getEnddate()).build();

		// project 목록객체 추가
		milestones.put(ccurrentId, milestoneItem);

		// 리소스 생성됨
		// res.setStatus(201);
		if (res != null) {
			res.setStatus(HttpServletResponse.SC_CREATED);
		}
//		milestoneService.sendMilestone(milestoneItem);
		// 추가된 객체를 반환
		return milestoneItem;
	}

	// project 1건 삭제
	// DELETE /projects/1
	@DeleteMapping(value = "milestone/{id}")
	public boolean removeMilestone(@PathVariable long id, HttpServletResponse res) {
		// 해당 id의 데이터 1건을 가져옴
		Milestone milestone = milestones.get(Long.valueOf(id));
		// 해당 id의 데이터가 없으면
		if (milestone == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// 삭제 수행
		milestones.remove(Long.valueOf(id));

//		milestoneService.sendRemoveMilestone(id);
		return true;

	}

	// project 1건 수정
	// PUT /projects/1
	@PutMapping(value = "milestones/{id}")
	public Milestone modifyMilestone(@PathVariable long id, @RequestBody Milestone milestone, HttpServletResponse res) {
		// 해당 id의 데이터 1건을 가져옴
		Milestone findItem = milestones.get(Long.valueOf(id));
		// 해당 id의 데이터가 없으면
		if (findItem == null) {

			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		if (milestone.getName() == null || milestone.getName().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (milestone.getStartdate() == null || milestone.getStartdate().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		if (milestone.getEnddate() == null || milestone.getEnddate().isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 데이터 변경
		findItem.setName(milestone.getName());
		findItem.setStartdate(milestone.getStartdate());
		findItem.setEnddate(milestone.getEnddate());

//		milestoneService.sendModifiedMilestone(findItem);
		return findItem;
	}
}