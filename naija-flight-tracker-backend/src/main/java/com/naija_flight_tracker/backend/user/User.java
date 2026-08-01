package com.naija_flight_tracker.backend.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

// Deliberately minimal — no password, no auth. Until we build real login, this
// exists purely so SavedTrip/Alert have someone to belong to.
@Entity
public class User {

    @Id
    private String id; // e.g. "adaeze"

    private String name; // e.g. "Adaeze O."

    protected User() {
    }

    public User(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
