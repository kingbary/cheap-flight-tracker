package com.naija_flight_tracker.backend.flight;

import com.naija_flight_tracker.backend.common.ApiResponse;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/flights")
public class FlightController {

    private final FlightRepository flightRepository;

    public FlightController(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    // e.g. GET /api/v1/flights?from=LOS&to=ABV
    // @RequestParam binds query-string parameters straight to method arguments.
    @GetMapping
    public ApiResponse<List<FlightResponse>> getFlights(
            @RequestParam String from,
            @RequestParam String to) {
        List<Flight> flights = flightRepository.findByOriginCodeAndDestinationCode(from, to);
        List<FlightResponse> response = flights.stream()
                .map(FlightResponse::from)
                .toList();
        return ApiResponse.success("Flights fetched successfully", response);
    }

    // e.g. GET /api/v1/flights/fl-01
    // @PathVariable binds the {id} segment of the URL to this method argument.
    @GetMapping("/{id}")
    public ApiResponse<FlightResponse> getFlight(@PathVariable String id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found: " + id));
        return ApiResponse.success("Flight fetched successfully", FlightResponse.from(flight));
    }
}
