package com.naija_flight_tracker.backend.trending;

import com.naija_flight_tracker.backend.airport.Airport;
import com.naija_flight_tracker.backend.airport.AirportRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(4) // after AirportDataSeeder (1), AirlineDataSeeder (2), FlightDataSeeder (3)
public class TrendingDataSeeder implements CommandLineRunner {

    private final TrendingRepository trendingRepository;
    private final AirportRepository airportRepository;

    public TrendingDataSeeder(TrendingRepository trendingRepository, AirportRepository airportRepository) {
        this.trendingRepository = trendingRepository;
        this.airportRepository = airportRepository;
    }

    @Override
    public void run(String... args) {
        if (trendingRepository.count() > 0) {
            return;
        }

        Airport los = airportRepository.findById("LOS").orElseThrow();
        Airport abv = airportRepository.findById("ABV").orElseThrow();
        Airport phc = airportRepository.findById("PHC").orElseThrow();
        Airport kan = airportRepository.findById("KAN").orElseThrow();
        Airport enu = airportRepository.findById("ENU").orElseThrow();
        Airport cbq = airportRepository.findById("CBQ").orElseThrow();

        trendingRepository.saveAll(List.of(
                new Trending(los, abv, 55400, -18, "Lagos → Abuja"),
                new Trending(los, phc, 71200, -12, "Lagos → Port Harcourt"),
                new Trending(abv, kan, 64900, -7, "Abuja → Kano"),
                new Trending(los, enu, 78600, 4, "Lagos → Enugu"),
                new Trending(los, cbq, 88100, -2, "Lagos → Calabar"),
                new Trending(abv, phc, 69500, -15, "Abuja → Port Harcourt")
        ));
    }
}
