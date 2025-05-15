package com.example.postgreserver.oscar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OscarRepository extends JpaRepository<Oscar, Long> {
}

