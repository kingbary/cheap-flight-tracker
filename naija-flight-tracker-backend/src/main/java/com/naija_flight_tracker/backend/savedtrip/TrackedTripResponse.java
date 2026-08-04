package com.naija_flight_tracker.backend.savedtrip;

import com.naija_flight_tracker.backend.airport.AirportSummary;

// Richer than SavedTripResponse — used for the "list everything I'm tracking"
// view (the Dashboard). currentPrice is a nullable Integer, not a primitive int:
// we only have real Flight data for some routes, so "no price data yet" has to
// be representable, not just defaulted to 0.
public record TrackedTripResponse(
        String id,
        AirportSummary origin,
        AirportSummary destination,
        int targetPrice,
        Integer currentPrice,
        int alertCount
) {

    public static TrackedTripResponse from(SavedTrip trip, Integer currentPrice, int alertCount) {
        return new TrackedTripResponse(
                trip.getId(),
                AirportSummary.from(trip.getOrigin()),
                AirportSummary.from(trip.getDestination()),
                trip.getTargetPrice(),
                currentPrice,
                alertCount
        );
    }
}
