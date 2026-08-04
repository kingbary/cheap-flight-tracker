package com.naija_flight_tracker.backend.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Order(5) // after Airport (1), Airline (2), Flight (3), Trending (4)
public class UserDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        // A real, working demo login: email adaeze@example.com / password "password123".
        // Matches the hardcoded "Adaeze O." user shown elsewhere in the frontend
        // (Home's greeting, ResultsDesktop's account pill).
        userRepository.save(new User(
                "adaeze",
                "adaeze@example.com",
                passwordEncoder.encode("password123"),
                "Adaeze O."));
    }
}
