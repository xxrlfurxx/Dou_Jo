package com.xxrlfurxx.DouJo.configuration;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfiguration {
	// °´Ã¼ -> JSON
	@Bean
	public MessageConverter rabbitMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}