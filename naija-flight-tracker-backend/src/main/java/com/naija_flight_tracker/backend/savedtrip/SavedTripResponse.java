package com.naija_flight_tracker.backend.savedtrip;

import com.naija_flight_tracker.backend.airport.AirportSummary;

public record SavedTripResponse(
        String id,
        AirportSummary origin,
        AirportSummary destination,
        int targetPrice
) {

    public static SavedTripResponse from(SavedTrip trip) {
        return new SavedTripResponse(
                trip.getId(),
                AirportSummary.from(trip.getOrigin()),
                AirportSummary.from(trip.getDestination()),
                trip.getTargetPrice()
        );
    }
}
