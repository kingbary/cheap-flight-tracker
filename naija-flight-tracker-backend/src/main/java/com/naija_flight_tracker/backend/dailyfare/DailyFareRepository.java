package com.naija_flight_tracker.backend.dailyfare;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyFareRepository extends JpaRepository<DailyFare, String> {

    List<DailyFare> findByOriginCodeAndDestinationCodeOrderByDate(String originCode, String destinationCode);
}
