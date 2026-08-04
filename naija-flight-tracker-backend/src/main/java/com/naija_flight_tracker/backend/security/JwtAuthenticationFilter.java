package com.naija_flight_tracker.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

// OncePerRequestFilter runs before Spring MVC's own dispatch logic, for every
// request, exactly once. This is where "does this request have a valid token,
// and if so, who is it for" gets decided — everything downstream (our
// controllers) just asks Spring "who's the current user?" via Authentication.
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring("Bearer ".length());
            if (jwtService.isValid(token)) {
                String userId = jwtService.extractUserId(token);
                var authentication = new UsernamePasswordAuthenticationToken(userId, null, List.of());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            // An invalid/expired token is deliberately not an error here — we just
            // don't authenticate the request. Whether that then results in a 401
            // depends entirely on whether the endpoint being hit requires auth
            // (SecurityConfig decides that), not this filter.
        }

        filterChain.doFilter(request, response);
    }
}
