package com.naija_flight_tracker.backend.airport;

import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

// @Component makes Spring pick this class up and manage it as a bean.
// CommandLineRunner's run() method is called once, automatically, right after startup.
// @Order controls the sequence when there are multiple CommandLineRunner beans —
// FlightDataSeeder depends on airports and airlines already existing, so this one
// must run first.
@Component
@Order(1)
public class AirportDataSeeder implements CommandLineRunner {

    private final AirportRepository airportRepository;

    public AirportDataSeeder(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    @Override
    public void run(String... args) {
        if (airportRepository.count() > 0) {
            return; // already seeded, don't insert duplicates on every restart
        }

        airportRepository.saveAll(List.of(
                new Airport("LOS", "Lagos", "Murtala Muhammed Intl"),
                new Airport("ABV", "Abuja", "Nnamdi Azikiwe Intl"),
                new Airport("PHC", "Port Harcourt", "Omagwa Intl"),
                new Airport("KAN", "Kano", "Mallam Aminu Kano"),
                new Airport("ENU", "Enugu", "Akanu Ibiam Intl"),
                new Airport("CBQ", "Calabar", "Margaret Ekpo Intl"),
                new Airport("IBA", "Ibadan", "Ibadan Airport"),
                new Airport("QUO", "Uyo", "Akwa Ibom Intl"),
                new Airport("QOW", "Owerri", "Sam Mbakwe Intl"),
                new Airport("BNI", "Benin City", "Benin Airport"),
                new Airport("SKO", "Sokoto", "Sadiq Abubakar III"),
                new Airport("YOL", "Yola", "Yola Airport"),
                new Airport("MIU", "Maiduguri", "Maiduguri Intl"),
                new Airport("ILR", "Ilorin", "Ilorin Intl")
        ));
    }
}
