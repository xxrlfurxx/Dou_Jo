package com.xxrlfurxx.DouJo.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    // WebMvcConfigurer 인터페이스를 구현하면 해당 코드 안에 오버라이딩 된 함수를 읽어서 addCorsMappings을 실행
    // CORS(cross origin resource sharing) 정책을 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 공유정책을 적용할 리소스.
        registry.addMapping("/**") // "/**" => 전체 리소스를 허용 (/todos, /contacts...)
                // 공유정책을 허용할 오리진 목록
                // origin(원천): html문서를 배포한 서버의 주소
                // html 문서에는 어디서 문서를 받아왔는지를 기록하고 있음
                // 브라우저 -> 서버
                .allowedOrigins("http://localhost:3000")
                // 공유정책을 허용할 HTTP메서드
                .allowedMethods("*"); // 전체메서드를 허용(GET, POST, PUT...):
    }
}