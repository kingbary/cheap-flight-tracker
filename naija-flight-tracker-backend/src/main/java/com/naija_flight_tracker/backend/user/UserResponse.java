package com.naija_flight_tracker.backend.user;

import java.time.Instant;

// Deliberately excludes password (a hash, but still shouldn't be exposed) and
// email (avoids enumerating registered accounts through a public endpoint).
public record UserResponse(String id, String name, Instant createdAt, Instant updatedAt) {

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getCreatedAt(), user.getUpdatedAt());
    }
}
