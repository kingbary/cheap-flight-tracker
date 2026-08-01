package com.naija_flight_tracker.backend.savedtrip;

import com.naija_flight_tracker.backend.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

// Just the single-route lookup the Tracker page needs (e.g. "is LOS->ABV being
// tracked, and at what target price?"). A "list all my saved trips" endpoint would
// be the natural next feature — that's what would feed a full Saved Trips list
// screen — but nothing needs it yet, so it isn't built.
@RestController
@RequestMapping("/saved-trips")
public class SavedTripController {

    private final SavedTripRepository savedTripRepository;

    public SavedTripController(SavedTripRepository savedTripRepository) {
        this.savedTripRepository = savedTripRepository;
    }

    // e.g. GET /api/v1/saved-trips?from=LOS&to=ABV
    @GetMapping
    public ApiResponse<SavedTripResponse> getSavedTrip(
            @RequestParam String from,
            @RequestParam String to) {
        SavedTrip trip = savedTripRepository.findByOriginCodeAndDestinationCode(from, to)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No saved trip for " + from + " -> " + to));
        return ApiResponse.success("Saved trip fetched successfully", SavedTripResponse.from(trip));
    }
}
