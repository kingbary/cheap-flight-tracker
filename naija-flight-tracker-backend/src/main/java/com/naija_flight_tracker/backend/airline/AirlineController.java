package com.naija_flight_tracker.backend.airline;

import com.naija_flight_tracker.backend.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/airlines")
public class AirlineController {

    private final AirlineRepository airlineRepository;

    public AirlineController(AirlineRepository airlineRepository) {
        this.airlineRepository = airlineRepository;
    }

    @GetMapping
    public ApiResponse<List<Airline>> getAllAirlines() {
        List<Airline> airlines = airlineRepository.findAll();
        return ApiResponse.success("Airlines fetched successfully", airlines);
    }
}
