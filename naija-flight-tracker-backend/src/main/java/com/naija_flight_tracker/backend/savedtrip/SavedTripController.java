package com.naija_flight_tracker.backend.savedtrip;

import com.naija_flight_tracker.backend.alert.AlertRepository;
import com.naija_flight_tracker.backend.common.ApiResponse;
import com.naija_flight_tracker.backend.flight.Flight;
import com.naija_flight_tracker.backend.flight.FlightRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/saved-trips")
public class SavedTripController {

    private final SavedTripRepository savedTripRepository;
    private final FlightRepository flightRepository;
    private final AlertRepository alertRepository;

    public SavedTripController(SavedTripRepository savedTripRepository,
                                FlightRepository flightRepository,
                                AlertRepository alertRepository) {
        this.savedTripRepository = savedTripRepository;
        this.flightRepository = flightRepository;
        this.alertRepository = alertRepository;
    }

    // e.g. GET /api/v1/saved-trips?from=LOS&to=ABV
    // Authentication is resolved automatically by Spring from whatever
    // JwtAuthenticationFilter put into the SecurityContext for this request —
    // authentication.getName() returns the userId, since that's what we set as
    // the token's "principal" when we authenticated it.
    //
    // params = {"from", "to"} on this mapping is what lets it coexist with the
    // list endpoint below on the same path — Spring only routes here when both
    // query params are present, and falls back to the no-params method otherwise.
    @GetMapping(params = {"from", "to"})
    public ApiResponse<SavedTripResponse> getSavedTrip(
            Authentication authentication,
            @RequestParam String from,
            @RequestParam String to) {
        String userId = authentication.getName();
        SavedTrip trip = savedTripRepository.findByUserIdAndOriginCodeAndDestinationCode(userId, from, to)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No saved trip for " + from + " -> " + to));
        return ApiResponse.success("Saved trip fetched successfully", SavedTripResponse.from(trip));
    }

    // e.g. GET /api/v1/saved-trips — every route being tracked, for the Dashboard.
    @GetMapping
    public ApiResponse<List<TrackedTripResponse>> getSavedTrips(Authentication authentication) {
        String userId = authentication.getName();
        List<TrackedTripResponse> response = savedTripRepository.findByUserId(userId).stream()
                .map(trip -> {
                    List<Flight> flights = flightRepository.findByOriginCodeAndDestinationCode(
                            trip.getOrigin().getCode(), trip.getDestination().getCode());
                    Integer currentPrice = flights.stream()
                            .mapToInt(Flight::getPrice)
                            .min()
                            .stream().boxed().findFirst()
                            .orElse(null);
                    int alertCount = alertRepository.countBySavedTripId(trip.getId());
                    return TrackedTripResponse.from(trip, currentPrice, alertCount);
                })
                .toList();
        return ApiResponse.success("Saved trips fetched successfully", response);
    }
}
