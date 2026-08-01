package com.naija_flight_tracker.backend.dailyfare;

import com.naija_flight_tracker.backend.airport.Airport;
import com.naija_flight_tracker.backend.airport.AirportRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(8) // only needs Airport (1) already seeded
public class DailyFareDataSeeder implements CommandLineRunner {

    // Same day-by-day values (in thousands of Naira) as the frontend's old
    // CAL_PRICES mock for April — day 30 deliberately has no entry, same as before.
    private static final int[] PRICES_IN_THOUSANDS = {
            71, 68, 64, 58, 62, 60, 55, 58, 64, 67, 70, 74, 78, 72,
            64, 58, 55, 53, 58, 62, 68, 71, 76, 82, 88, 91, 88, 80, 74
    };

    private final DailyFareRepository dailyFareRepository;
    private final AirportRepository airportRepository;

    public DailyFareDataSeeder(DailyFareRepository dailyFareRepository, AirportRepository airportRepository) {
        this.dailyFareRepository = dailyFareRepository;
        this.airportRepository = airportRepository;
    }

    @Override
    public void run(String... args) {
        if (dailyFareRepository.count() > 0) {
            return;
        }

        Airport los = airportRepository.findById("LOS").orElseThrow();
        Airport abv = airportRepository.findById("ABV").orElseThrow();

        List<DailyFare> fares = new ArrayList<>();
        for (int i = 0; i < PRICES_IN_THOUSANDS.length; i++) {
            LocalDate date = LocalDate.of(2026, 4, i + 1);
            fares.add(new DailyFare(los, abv, date, PRICES_IN_THOUSANDS[i] * 1000));
        }
        dailyFareRepository.saveAll(fares);
    }
}
