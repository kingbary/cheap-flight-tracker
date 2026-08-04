package com.naija_flight_tracker.backend.security;

import com.naija_flight_tracker.backend.common.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import tools.jackson.databind.ObjectMapper;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // BCrypt: a one-way hash designed to be slow on purpose (so brute-forcing a
    // stolen password database is expensive). We never store or compare plain
    // text passwords — only hashes, via passwordEncoder.matches(raw, hash).
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Moved here from WebConfig: Spring Security's filter chain runs before MVC
    // ever sees the request, so if CORS isn't configured at this layer too, a
    // browser's preflight OPTIONS request can get rejected by security rules
    // before it ever reaches the CORS-aware part of the code.
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Without these, a rejected request never reaches a @RestController at all —
    // Spring Security's own filter chain writes the response directly, bypassing
    // ApiExceptionHandler entirely. Left unconfigured, that means an empty body
    // with no JSON, breaking the "every response looks like ApiResponse" contract
    // the rest of the API relies on.
    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint(ObjectMapper objectMapper) {
        return (request, response, authException) -> writeJsonError(response, objectMapper,
                HttpStatus.UNAUTHORIZED, "Authentication required");
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler(ObjectMapper objectMapper) {
        return (request, response, accessDeniedException) -> writeJsonError(response, objectMapper,
                HttpStatus.FORBIDDEN, "You don't have permission to do that");
    }

    private static void writeJsonError(HttpServletResponse response, ObjectMapper objectMapper,
                                        HttpStatus status, String message) throws IOException {
        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(objectMapper.writeValueAsString(ApiResponse.error(status.value(), message)));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                     AuthenticationEntryPoint authenticationEntryPoint,
                                                     AccessDeniedHandler accessDeniedHandler) throws Exception {
        http
                // CSRF protection defends against a malicious site tricking a
                // logged-in browser into submitting a cookie-authenticated form.
                // We're a stateless JSON API authenticated by an Authorization
                // header, not cookies, so that attack doesn't apply here.
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // No HttpSession — every request must prove who it is via its own
                // JWT, we don't remember previous requests server-side.
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint) // no/invalid token -> 401
                        .accessDeniedHandler(accessDeniedHandler))          // authenticated but not allowed -> 403
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/airports/**", "/api/v1/airlines/**", "/api/v1/flights/**",
                                "/api/v1/trending/**", "/api/v1/daily-fares/**", "/api/v1/users/**")
                        .permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
