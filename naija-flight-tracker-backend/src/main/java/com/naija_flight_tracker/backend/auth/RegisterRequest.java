package com.naija_flight_tracker.backend.auth;

public record RegisterRequest(String email, String password, String name) {
}
