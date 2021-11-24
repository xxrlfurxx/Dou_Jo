//package com.xxrlfurxx.DouJo.domain.milestone;
//
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//public class MilestoneService {
//RabbitTemplate rabbit;
//	
//	private MilestoneService(RabbitTemplate rabbit) {
//		this.rabbit = rabbit;
//	}
//	
//	public void sendMilestone(Milestone milestone) {
//		System.out.println(milestone);
//		rabbit.convertAndSend("milestone.send", milestone);
//	}
//	
//	public void sendModifiedMilestone(Milestone milestone) {
//		rabbit.convertAndSend("milestone.modified.send", milestone);
//	}
//	
//	public void sendRemoveMilestone(long milestoneId) {
//		rabbit.convertAndSend("milestone.removed.send", milestoneId);
//	}
//	
//}
