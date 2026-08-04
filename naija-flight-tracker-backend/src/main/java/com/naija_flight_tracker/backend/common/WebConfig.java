package com.naija_flight_tracker.backend.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Implementing WebMvcConfigurer lets us hook into Spring MVC's configuration.
// Here we prepend "/api/v1" to every @RestController's routes automatically,
// so individual controllers just declare "/airports", "/airlines", "/flights"
// and never repeat the version prefix themselves.
//
// CORS used to be configured here too, but now that Spring Security is on the
// classpath, that config moved to SecurityConfig — Security's filter chain runs
// before MVC ever sees the request, so CORS has to be set up at that layer too.
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.addPathPrefix("/api/v1", HandlerTypePredicate.forAnnotation(RestController.class));
    }
}
