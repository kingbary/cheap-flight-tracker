package com.naija_flight_tracker.backend.flight;

import com.naija_flight_tracker.backend.airline.Airline;
import com.naija_flight_tracker.backend.airport.AirportSummary;

// A DTO (data transfer object): the flat JSON shape we actually want to send to the
// frontend, kept separate from the Flight entity itself.
//
// This is a "record" — Java's shorthand for a class that's just an immutable bundle
// of fields. Writing `record FlightResponse(String id, ...)` auto-generates the
// constructor, accessor methods (id(), flightNumber(), ... — note: no "get" prefix),
// equals(), hashCode(), and toString(). No boilerplate to hand-write, unlike Flight.java.
public record FlightResponse(
        String id,
        String flightNumber,
        String departureTime,
        String arrivalTime,
        String duration,
        int stops,
        int price,
        int wasPrice,
        int score,
        String deal,
        AirlineSummary airline,
        AirportSummary origin,
        AirportSummary destination
) {

    // Converts a Flight entity into this response shape. Reading flight.getAirline(),
    // flight.getOrigin() etc. here is what actually triggers the LAZY-loaded queries
    // for those relationships — that only works because this runs inside the same
    // request, while the database connection is still open.
    public static FlightResponse from(Flight flight) {
        return new FlightResponse(
                flight.getId(),
                flight.getFlightNumber(),
                flight.getDepartureTime(),
                flight.getArrivalTime(),
                flight.getDuration(),
                flight.getStops(),
                flight.getPrice(),
                flight.getWasPrice(),
                flight.getScore(),
                flight.getDeal(),
                AirlineSummary.from(flight.getAirline()),
                AirportSummary.from(flight.getOrigin()),
                AirportSummary.from(flight.getDestination())
        );
    }

    // Nested records are implicitly static — small, private-ish shapes that only
    // make sense in the context of a FlightResponse, so they live inside it rather
    // than as their own top-level files.
    public record AirlineSummary(String code, String name, String mark, String bg, String fg) {
        static AirlineSummary from(Airline airline) {
            return new AirlineSummary(
                    airline.getCode(), airline.getName(), airline.getMark(), airline.getBg(), airline.getFg());
        }
    }
}
