package com.example.postgreserver.crew;

import com.example.postgreserver.countries.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Long> {
}
