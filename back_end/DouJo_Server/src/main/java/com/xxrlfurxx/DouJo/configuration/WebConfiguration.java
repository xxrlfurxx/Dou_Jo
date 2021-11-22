package com.xxrlfurxx.DouJo.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    // WebMvcConfigurer �������̽��� �����ϸ� �ش� �ڵ� �ȿ� �������̵� �� �Լ��� �о addCorsMappings�� ����
    // CORS(cross origin resource sharing) ��å�� ����
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // ������å�� ������ ���ҽ�.
        registry.addMapping("/**") // "/**" => ��ü ���ҽ��� ��� (/todos, /contacts...)
                // ������å�� ����� ������ ���
                // origin(��õ): html������ ������ ������ �ּ�
                // html �������� ��� ������ �޾ƿԴ����� ����ϰ� ����
                // ������ -> ����
                .allowedOrigins("http://localhost:3000")
                // ������å�� ����� HTTP�޼���
                .allowedMethods("*"); // ��ü�޼��带 ���(GET, POST, PUT...):
    }
}