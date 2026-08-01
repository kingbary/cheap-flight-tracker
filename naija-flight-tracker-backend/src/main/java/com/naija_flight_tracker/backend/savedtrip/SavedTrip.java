package com.naija_flight_tracker.backend.savedtrip;

import com.naija_flight_tracker.backend.airport.Airport;
import com.naija_flight_tracker.backend.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SavedTrip {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "origin_code")
    private Airport origin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_code")
    private Airport destination;

    private int targetPrice;

    protected SavedTrip() {
    }

    public SavedTrip(User user, Airport origin, Airport destination, int targetPrice) {
        this.user = user;
        this.origin = origin;
        this.destination = destination;
        this.targetPrice = targetPrice;
    }

    public String getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Airport getOrigin() {
        return origin;
    }

    public Airport getDestination() {
        return destination;
    }

    public int getTargetPrice() {
        return targetPrice;
    }
}
