package com.example.postgreserver.oscar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OscarRepository extends JpaRepository<Oscar, Long> {

    @Query("SELECT o.winner FROM Oscar o WHERE o.film = :name AND o.category = 'BEST PICTURE'")
    Optional<Boolean> wonOscar(@Param("name") String name);

}

