package com.naija_flight_tracker.backend.flight;

import com.naija_flight_tracker.backend.airline.Airline;
import com.naija_flight_tracker.backend.airline.AirlineRepository;
import com.naija_flight_tracker.backend.airport.Airport;
import com.naija_flight_tracker.backend.airport.AirportRepository;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(3) // must run after AirportDataSeeder (1) and AirlineDataSeeder (2)
public class FlightDataSeeder implements CommandLineRunner {

    private final FlightRepository flightRepository;
    private final AirlineRepository airlineRepository;
    private final AirportRepository airportRepository;

    public FlightDataSeeder(FlightRepository flightRepository,
                            AirlineRepository airlineRepository,
                            AirportRepository airportRepository) {
        this.flightRepository = flightRepository;
        this.airlineRepository = airlineRepository;
        this.airportRepository = airportRepository;
    }

    @Override
    public void run(String... args) {
        if (flightRepository.count() > 0) {
            return;
        }

        // Look up the already-seeded Airport/Airline rows so Flight can reference them.
        // orElseThrow() is deliberate here: if these codes are missing, seeding order
        // is broken and we want a loud failure at startup, not a silent bad state.
        Airport los = airportRepository.findById("LOS").orElseThrow();
        Airport abv = airportRepository.findById("ABV").orElseThrow();

        Airline ga = airlineRepository.findById("GA").orElseThrow();
        Airline ib = airlineRepository.findById("IB").orElseThrow();
        Airline ap = airlineRepository.findById("AP").orElseThrow();
        Airline un = airlineRepository.findById("UN").orElseThrow();
        Airline vj = airlineRepository.findById("VJ").orElseThrow();
        Airline ar = airlineRepository.findById("AR").orElseThrow();

        flightRepository.saveAll(List.of(
                new Flight("fl-01", ga, los, abv, "Q9 421", "06:15", "07:25", "1h 10m", 0, 58400, 71200, 94, "Cheapest"),
                new Flight("fl-02", ib, los, abv, "QI 309", "07:40", "08:55", "1h 15m", 0, 72500, 79000, 88, "Best time"),
                new Flight("fl-03", ap, los, abv, "AP 712", "09:25", "10:35", "1h 10m", 0, 82900, 82900, 76, null),
                new Flight("fl-04", un, los, abv, "NUA 117", "12:05", "13:20", "1h 15m", 0, 64800, 88000, 91, "Hot drop"),
                new Flight("fl-05", vj, los, abv, "VK 88", "15:40", "16:55", "1h 15m", 0, 69900, 74000, 82, null),
                new Flight("fl-06", ar, los, abv, "W3 502", "18:30", "19:45", "1h 15m", 0, 91500, 91500, 70, null)
        ));
    }
}
