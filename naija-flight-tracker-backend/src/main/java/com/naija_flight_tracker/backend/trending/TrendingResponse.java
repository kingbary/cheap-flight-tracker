package com.naija_flight_tracker.backend.trending;

import com.naija_flight_tracker.backend.airport.AirportSummary;

public record TrendingResponse(
        String id,
        AirportSummary from,
        AirportSummary to,
        int price,
        int drop,
        String label
) {

    public static TrendingResponse trends(Trending trending) {
        return new TrendingResponse(
                trending.getId(),
                AirportSummary.from(trending.getFrom()),
                AirportSummary.from(trending.getTo()),
                trending.getPrice(),
                trending.getPriceDrop(),
                trending.getLabel()
        );
    }
}
