package com.example.postgreserver.releases;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReleasesRepository extends JpaRepository<Releases, Long>{
}
