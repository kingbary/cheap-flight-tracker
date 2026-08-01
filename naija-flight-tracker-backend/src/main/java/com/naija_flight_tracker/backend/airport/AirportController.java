package com.naija_flight_tracker.backend.airport;

import com.naija_flight_tracker.backend.common.ApiResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/airports")
public class AirportController {

    private final AirportRepository airportRepository;

    // Spring sees this constructor and automatically "injects" an AirportRepository
    // instance here at startup — we never call `new AirportController(...)` ourselves.
    public AirportController(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    @GetMapping
    public ApiResponse<List<Airport>> getAllAirports() {
        List<Airport> airports = airportRepository.findAll();
        return ApiResponse.success("Airports fetched successfully", airports);
    }
}
