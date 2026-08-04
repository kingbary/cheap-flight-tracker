package com.naija_flight_tracker.backend.alert;

import com.naija_flight_tracker.backend.common.ApiResponse;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alerts")
public class AlertController {

    private final AlertRepository alertRepository;

    public AlertController(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    @GetMapping
    public ApiResponse<List<AlertResponse>> getAlerts(Authentication authentication) {
        String userId = authentication.getName();
        List<Alert> alerts = alertRepository.findBySavedTripUserIdOrderByCreatedAtDesc(userId);
        List<AlertResponse> response = alerts.stream()
                .map(AlertResponse::from)
                .toList();
        return ApiResponse.success("Alerts fetched successfully", response);
    }
}
