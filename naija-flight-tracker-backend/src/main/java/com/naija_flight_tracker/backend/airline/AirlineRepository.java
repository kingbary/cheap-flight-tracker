package com.naija_flight_tracker.backend.airline;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AirlineRepository extends JpaRepository<Airline, String> {
}
