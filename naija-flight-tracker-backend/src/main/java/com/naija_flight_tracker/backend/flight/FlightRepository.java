package com.naija_flight_tracker.backend.flight;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, String> {

    // Spring Data JPA parses this method name itself: "OriginCode" walks the
    // `origin` relationship and reads its `code` property, same for
    // "DestinationCode". No SQL, no implementation — just this signature —
    // and Spring generates something equivalent to:
    // SELECT * FROM flight f
    //   JOIN airport o ON f.origin_code = o.code
    //   JOIN airport d ON f.destination_code = d.code
    //   WHERE o.code = ?1 AND d.code = ?2
    List<Flight> findByOriginCodeAndDestinationCode(String originCode, String destinationCode);
}
