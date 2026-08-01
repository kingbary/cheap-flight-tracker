package com.naija_flight_tracker.backend.savedtrip;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedTripRepository extends JpaRepository<SavedTrip, String> {

    Optional<SavedTrip> findByOriginCodeAndDestinationCode(String originCode, String destinationCode);
}
