package com.naija_flight_tracker.backend.alert;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, String> {

    List<Alert> findAllByOrderByCreatedAtDesc();

    int countBySavedTripId(String savedTripId);
}
