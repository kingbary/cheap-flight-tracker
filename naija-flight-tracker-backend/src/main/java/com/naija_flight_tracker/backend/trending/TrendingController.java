package com.naija_flight_tracker.backend.trending;

import com.naija_flight_tracker.backend.common.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/trending")
public class TrendingController {

    private final TrendingRepository trendingRepository;

    public TrendingController(TrendingRepository trendingRepository) {
        this.trendingRepository = trendingRepository;
    }

    @GetMapping
    public ApiResponse<List<TrendingResponse>> getTrends() {
        List<Trending> trends = trendingRepository.findAll();
        List<TrendingResponse> response = trends.stream()
                .map(TrendingResponse::trends)
                .toList();
        return ApiResponse.success("Trends fetched successfully", response);
    }
}
