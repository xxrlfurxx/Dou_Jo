package com.xxrlfurxx.DouJo.domain.project;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
	RabbitTemplate rabbit;
	
	private ProjectService(RabbitTemplate rabbit) {
		this.rabbit = rabbit;
	}
	
	public void sendProject(Project project) {
		System.out.println(project);
		rabbit.convertAndSend("project.send", project);
	}
	
	public void sendModifiedProject(Project project) {
		rabbit.convertAndSend("project.modified.send", project);
	}
	
	public void sendRemoveProject(long projectId) {
		rabbit.convertAndSend("project.removed.send", projectId);
	}
	
}
