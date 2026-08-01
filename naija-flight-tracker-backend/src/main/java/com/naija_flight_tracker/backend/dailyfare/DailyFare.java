package com.naija_flight_tracker.backend.dailyfare;

import com.naija_flight_tracker.backend.airport.Airport;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;

// A single day's price on a route — what powers the price calendar. LocalDate,
// not Instant: this is a calendar date ("18 April"), not a precise moment in time.
@Entity
public class DailyFare {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "origin_code")
    private Airport origin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_code")
    private Airport destination;

    private LocalDate date;

    private int price;

    protected DailyFare() {
    }

    public DailyFare(Airport origin, Airport destination, LocalDate date, int price) {
        this.origin = origin;
        this.destination = destination;
        this.date = date;
        this.price = price;
    }

    public Airport getOrigin() {
        return origin;
    }

    public Airport getDestination() {
        return destination;
    }

    public LocalDate getDate() {
        return date;
    }

    public int getPrice() {
        return price;
    }
}
