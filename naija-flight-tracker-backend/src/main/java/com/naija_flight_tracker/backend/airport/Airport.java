package com.naija_flight_tracker.backend.airport;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Airport {

    @Id
    private String code; // IATA-style code, e.g. "LOS"

    private String name; // City name, e.g. "Lagos"

    private String subtitle; // Airport full name, e.g. "Murtala Muhammed Intl"

    // JPA requires a no-arg constructor so Hibernate can build empty instances
    // and then fill in the fields itself when reading rows from the database.
    protected Airport() {
    }

    public Airport(String code, String name, String subtitle) {
        this.code = code;
        this.name = name;
        this.subtitle = subtitle;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getSubtitle() {
        return subtitle;
    }
}
