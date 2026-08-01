package com.naija_flight_tracker.backend.dailyfare;

import com.naija_flight_tracker.backend.common.ApiResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/daily-fares")
public class DailyFareController {

    private final DailyFareRepository dailyFareRepository;

    public DailyFareController(DailyFareRepository dailyFareRepository) {
        this.dailyFareRepository = dailyFareRepository;
    }

    // e.g. GET /api/v1/daily-fares?from=LOS&to=ABV
    @GetMapping
    public ApiResponse<List<DailyFareResponse>> getDailyFares(
            @RequestParam String from,
            @RequestParam String to) {
        List<DailyFare> fares = dailyFareRepository.findByOriginCodeAndDestinationCodeOrderByDate(from, to);
        List<DailyFareResponse> response = fares.stream()
                .map(DailyFareResponse::from)
                .toList();
        return ApiResponse.success("Daily fares fetched successfully", response);
    }
}
