package com.naija_flight_tracker.backend.flight;

import com.naija_flight_tracker.backend.airline.Airline;
import com.naija_flight_tracker.backend.airport.Airport;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Flight {

    @Id
    private String id; // e.g. "fl-01"

    // Many flights can be operated by the same airline, hence @ManyToOne.
    // fetch = LAZY: don't bother loading the related Airline row from the database
    // until code actually calls getAirline() — @ManyToOne defaults to EAGER (always
    // load it immediately), which quietly does an extra join every single time you
    // load a Flight, even if you never use it. LAZY is almost always what you want.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "airline_code") // the actual foreign key column name in the flight table
    private Airline airline;

    // Two relationships to the *same* Airport table (origin and destination), so each
    // needs its own @JoinColumn name — otherwise Hibernate can't tell them apart.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "origin_code")
    private Airport origin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_code")
    private Airport destination;

    private String flightNumber; // e.g. "Q9 421"

    private String departureTime; // e.g. "06:15"

    private String arrivalTime; // e.g. "07:25"

    private String duration; // e.g. "1h 10m"

    private int stops;

    private int price;

    private int wasPrice;

    private int score;

    private String deal; // nullable — e.g. "Cheapest", or no deal at all

    protected Flight() {
    }

    public Flight(String id, Airline airline, Airport origin, Airport destination,
                  String flightNumber, String departureTime, String arrivalTime, String duration,
                  int stops, int price, int wasPrice, int score, String deal) {
        this.id = id;
        this.airline = airline;
        this.origin = origin;
        this.destination = destination;
        this.flightNumber = flightNumber;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.duration = duration;
        this.stops = stops;
        this.price = price;
        this.wasPrice = wasPrice;
        this.score = score;
        this.deal = deal;
    }

    public String getId() {
        return id;
    }

    public Airline getAirline() {
        return airline;
    }

    public Airport getOrigin() {
        return origin;
    }

    public Airport getDestination() {
        return destination;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public String getDuration() {
        return duration;
    }

    public int getStops() {
        return stops;
    }

    public int getPrice() {
        return price;
    }

    public int getWasPrice() {
        return wasPrice;
    }

    public int getScore() {
        return score;
    }

    public String getDeal() {
        return deal;
    }
}
