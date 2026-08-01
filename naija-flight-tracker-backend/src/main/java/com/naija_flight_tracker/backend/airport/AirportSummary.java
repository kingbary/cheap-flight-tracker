package com.naija_flight_tracker.backend.airport;

// A small, reusable shape for embedding an Airport inside other responses
// (Flight, Trending, ...) without exposing the full entity.
public record AirportSummary(String code, String name, String subtitle) {

    public static AirportSummary from(Airport airport) {
        return new AirportSummary(airport.getCode(), airport.getName(), airport.getSubtitle());
    }
}
