package com.naija_flight_tracker.backend.alert;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, String> {

    // Unscoped — kept for internal/admin-style use; the controller uses the
    // scoped version below so one user never sees another's alerts.
    List<Alert> findAllByOrderByCreatedAtDesc();

    // Walks Alert -> savedTrip -> user, same nested-property pattern as
    // FlightRepository's findByOriginCodeAndDestinationCode.
    List<Alert> findBySavedTripUserIdOrderByCreatedAtDesc(String userId);

    int countBySavedTripId(String savedTripId);
}
