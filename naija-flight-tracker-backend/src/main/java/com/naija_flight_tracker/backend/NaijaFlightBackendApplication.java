package com.naija_flight_tracker.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

// UserDetailsServiceAutoConfiguration is excluded because we never use it: that's
// what generates the "Using generated security password: ..." in-memory default
// user Spring Boot creates when no UserDetailsService bean exists. We authenticate
// manually in AuthController (email/password against our own User table) and via
// JwtAuthenticationFilter, so that default user is dead weight, and the warning
// it prints looks alarming without meaning anything.
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class NaijaFlightBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(NaijaFlightBackendApplication.class, args);
	}

}
