package com.naija_flight_tracker.backend.savedtrip;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedTripRepository extends JpaRepository<SavedTrip, String> {

    // Unscoped by user — used internally by AlertDataSeeder, which operates with
    // full bootstrap access, not as a specific logged-in user's request.
    Optional<SavedTrip> findByOriginCodeAndDestinationCode(String originCode, String destinationCode);

    // Scoped versions — what the controller actually uses, so one user can never
    // see or query another user's tracked trips.
    List<SavedTrip> findByUserId(String userId);

    Optional<SavedTrip> findByUserIdAndOriginCodeAndDestinationCode(
            String userId, String originCode, String destinationCode);
}
