package com.naija_flight_tracker.backend.savedtrip;

import com.naija_flight_tracker.backend.airport.Airport;
import com.naija_flight_tracker.backend.airport.AirportRepository;
import com.naija_flight_tracker.backend.user.User;
import com.naija_flight_tracker.backend.user.UserRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(6) // needs Airport (1) and User (5) already seeded
public class SavedTripDataSeeder implements CommandLineRunner {

    private final SavedTripRepository savedTripRepository;
    private final AirportRepository airportRepository;
    private final UserRepository userRepository;

    public SavedTripDataSeeder(SavedTripRepository savedTripRepository,
                                AirportRepository airportRepository,
                                UserRepository userRepository) {
        this.savedTripRepository = savedTripRepository;
        this.airportRepository = airportRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (savedTripRepository.count() > 0) {
            return;
        }

        User adaeze = userRepository.findById("adaeze").orElseThrow();
        Airport los = airportRepository.findById("LOS").orElseThrow();
        Airport abv = airportRepository.findById("ABV").orElseThrow();
        Airport kan = airportRepository.findById("KAN").orElseThrow();
        Airport cbq = airportRepository.findById("CBQ").orElseThrow();

        savedTripRepository.saveAll(List.of(
                new SavedTrip(adaeze, los, abv, 60000),
                new SavedTrip(adaeze, los, kan, 95000),
                new SavedTrip(adaeze, abv, cbq, 80000)
        ));
    }
}
