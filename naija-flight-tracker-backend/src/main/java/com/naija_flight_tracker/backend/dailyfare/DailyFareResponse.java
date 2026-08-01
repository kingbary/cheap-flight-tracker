package com.naija_flight_tracker.backend.dailyfare;

import java.time.LocalDate;

public record DailyFareResponse(LocalDate date, int price) {

    public static DailyFareResponse from(DailyFare fare) {
        return new DailyFareResponse(fare.getDate(), fare.getPrice());
    }
}
