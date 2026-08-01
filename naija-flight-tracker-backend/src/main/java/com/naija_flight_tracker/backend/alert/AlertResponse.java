package com.naija_flight_tracker.backend.alert;

import com.naija_flight_tracker.backend.airport.AirportSummary;
import com.naija_flight_tracker.backend.flight.FlightResponse;
import com.naija_flight_tracker.backend.savedtrip.SavedTrip;
import java.time.Instant;

public record AlertResponse(
        String id,
        Instant createdAt,
        AirportSummary origin,
        AirportSummary destination,
        int targetPrice,
        FlightResponse flight
) {

    public static AlertResponse from(Alert alert) {
        SavedTrip trip = alert.getSavedTrip();
        return new AlertResponse(
                alert.getId(),
                alert.getCreatedAt(),
                AirportSummary.from(trip.getOrigin()),
                AirportSummary.from(trip.getDestination()),
                trip.getTargetPrice(),
                FlightResponse.from(alert.getFlight())
        );
    }
}
