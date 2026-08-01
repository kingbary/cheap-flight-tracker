package com.naija_flight_tracker.backend.airline;

import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(2)
public class AirlineDataSeeder implements CommandLineRunner {

    private final AirlineRepository airlineRepository;

    public AirlineDataSeeder(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    @Override
    public void run(String... args) {
        if (airlineRepository.count() > 0) {
            return;
        }

        airlineRepository.saveAll(List.of(
                new Airline("AP", "Air Peace", "AP", "#E63946", "#fff"),
                new Airline("AR", "Arik Air", "A", "#0a3b6e", "#fff"),
                new Airline("DA", "Dana Air", "D", "#1f8b4c", "#fff"),
                new Airline("IB", "Ibom Air", "IB", "#0F3B73", "#f3c969"),
                new Airline("GA", "Green Africa", "GA", "#1ac580", "#0a1628"),
                new Airline("UN", "United Nigeria", "U", "#0d4f3c", "#f4c430"),
                new Airline("VJ", "ValueJet", "VJ", "#FF6A00", "#fff"),
                new Airline("MX", "Max Air", "MX", "#005baa", "#fff"),
                new Airline("AE", "Aero Contractors", "AC", "#7c1722", "#f4c430"),
                new Airline("OV", "Overland", "OV", "#222", "#fff")
        ));
    }
}
