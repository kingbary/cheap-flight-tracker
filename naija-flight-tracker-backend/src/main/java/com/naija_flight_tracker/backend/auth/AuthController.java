package com.naija_flight_tracker.backend.auth;

import com.naija_flight_tracker.backend.common.ApiResponse;
import com.naija_flight_tracker.backend.security.JwtService;
import com.naija_flight_tracker.backend.user.User;
import com.naija_flight_tracker.backend.user.UserRepository;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account with this email already exists");
        }

        User user = new User(
                UUID.randomUUID().toString(),
                request.email(),
                passwordEncoder.encode(request.password()),
                request.name());
        userRepository.save(user);

        String token = jwtService.generateToken(user.getId());
        return ApiResponse.success("Account created successfully", new AuthResponse(token, user.getId(), user.getName()));
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        // Deliberately the same error message whether the email doesn't exist or the
        // password is wrong — telling an attacker "that email isn't registered"
        // makes it trivial to enumerate real accounts.
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = jwtService.generateToken(user.getId());
        return ApiResponse.success("Logged in successfully", new AuthResponse(token, user.getId(), user.getName()));
    }
}
