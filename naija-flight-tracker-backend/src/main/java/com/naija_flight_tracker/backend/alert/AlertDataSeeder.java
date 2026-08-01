package com.naija_flight_tracker.backend.alert;

import com.naija_flight_tracker.backend.flight.Flight;
import com.naija_flight_tracker.backend.flight.FlightRepository;
import com.naija_flight_tracker.backend.savedtrip.SavedTrip;
import com.naija_flight_tracker.backend.savedtrip.SavedTripRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(7) // needs SavedTrip (6) and Flight (3) already seeded
public class AlertDataSeeder implements CommandLineRunner {

    private final AlertRepository alertRepository;
    private final SavedTripRepository savedTripRepository;
    private final FlightRepository flightRepository;

    public AlertDataSeeder(AlertRepository alertRepository,
                            SavedTripRepository savedTripRepository,
                            FlightRepository flightRepository) {
        this.alertRepository = alertRepository;
        this.savedTripRepository = savedTripRepository;
        this.flightRepository = flightRepository;
    }

    @Override
    public void run(String... args) {
        if (alertRepository.count() > 0) {
            return;
        }

        SavedTrip losAbv = savedTripRepository.findByOriginCodeAndDestinationCode("LOS", "ABV").orElseThrow();
        Flight flight = flightRepository.findById("fl-01").orElseThrow(); // Green Africa Q9 421 — cheapest LOS-ABV flight

        alertRepository.save(new Alert(losAbv, flight, Instant.now().minus(3, ChronoUnit.MINUTES)));
    }
}
