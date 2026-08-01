package com.naija_flight_tracker.backend.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Implementing WebMvcConfigurer lets us hook into Spring MVC's configuration.
// Here we prepend "/api/v1" to every @RestController's routes automatically,
// so individual controllers just declare "/airports", "/airlines", "/flights"
// and never repeat the version prefix themselves.
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("/api/v1", HandlerTypePredicate.forAnnotation(RestController.class));
    }

    // Without this, the browser blocks your Next.js app (localhost:3000) from calling
    // this API (localhost:8080) — different port means different "origin", and browsers
    // refuse cross-origin requests by default unless the server explicitly allows them.
    // This only affects browser-enforced requests; tools like curl or Postman were never
    // blocked, which is why the endpoints "worked" for you already when tested directly.
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH");
    }
}
