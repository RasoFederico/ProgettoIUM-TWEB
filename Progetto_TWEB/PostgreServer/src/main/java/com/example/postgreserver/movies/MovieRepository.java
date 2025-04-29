package com.example.postgreserver.movies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT m FROM Movie m WHERE m.name = :title ORDER BY m.id LIMIT 5 OFFSET 0")
    List<Movie> findByTitle(@Param("title") String title);

}
