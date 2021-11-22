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

	// ConcurrentSkipListMap Ű �������� ������ �Ǿ�����
	private SortedMap<Long, Milestone> milestones = Collections
			.synchronizedSortedMap(new TreeMap<Long, Milestone>(Collections.reverseOrder()));

	// id�� ������ ����� ����
	private AtomicLong maxId = new AtomicLong();

	// project �����ȸ
	// GET /projects
	@GetMapping(value = "/milestones")
	public List<Milestone> getProjects() {
		// �ʰ� ���
		return new ArrayList<Milestone>(milestones.values());
	}

	// project 1�� �߰�
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

		// id���� ����
		Long ccurrentId = maxId.incrementAndGet();

		// �Է¹��� �����ͷ� project��ü�� ����
		// id���� �������� ������ ������ ó����
		Milestone milestoneItem = Milestone.builder().id(ccurrentId).name(milestone.getName())
				.startdate(milestone.getStartdate()).enddate(milestone.getEnddate()).build();

		// project ��ϰ�ü �߰�
		milestones.put(ccurrentId, milestoneItem);

		// ���ҽ� ������
		// res.setStatus(201);
		if (res != null) {
			res.setStatus(HttpServletResponse.SC_CREATED);
		}
//		milestoneService.sendMilestone(milestoneItem);
		// �߰��� ��ü�� ��ȯ
		return milestoneItem;
	}

	// project 1�� ����
	// DELETE /projects/1
	@DeleteMapping(value = "milestone/{id}")
	public boolean removeMilestone(@PathVariable long id, HttpServletResponse res) {
		// �ش� id�� ������ 1���� ������
		Milestone milestone = milestones.get(Long.valueOf(id));
		// �ش� id�� �����Ͱ� ������
		if (milestone == null) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// ���� ����
		milestones.remove(Long.valueOf(id));

//		milestoneService.sendRemoveMilestone(id);
		return true;

	}

	// project 1�� ����
	// PUT /projects/1
	@PutMapping(value = "milestones/{id}")
	public Milestone modifyMilestone(@PathVariable long id, @RequestBody Milestone milestone, HttpServletResponse res) {
		// �ش� id�� ������ 1���� ������
		Milestone findItem = milestones.get(Long.valueOf(id));
		// �ش� id�� �����Ͱ� ������
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

		// ������ ����
		findItem.setName(milestone.getName());
		findItem.setStartdate(milestone.getStartdate());
		findItem.setEnddate(milestone.getEnddate());

//		milestoneService.sendModifiedMilestone(findItem);
		return findItem;
	}
}