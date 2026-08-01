package com.naija_flight_tracker.backend.alert;

import com.naija_flight_tracker.backend.flight.Flight;
import com.naija_flight_tracker.backend.savedtrip.SavedTrip;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.Instant;

@Entity
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saved_trip_id")
    private SavedTrip savedTrip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id")
    private Flight flight;

    private Instant createdAt;

    protected Alert() {
    }

    public Alert(SavedTrip savedTrip, Flight flight, Instant createdAt) {
        this.savedTrip = savedTrip;
        this.flight = flight;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public SavedTrip getSavedTrip() {
        return savedTrip;
    }

    public Flight getFlight() {
        return flight;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
