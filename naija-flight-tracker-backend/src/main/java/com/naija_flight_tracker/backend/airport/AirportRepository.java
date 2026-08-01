package com.naija_flight_tracker.backend.airport;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportRepository extends JpaRepository<Airport, String> {
}
