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

    @Query("SELECT m FROM Movie m ORDER BY m.id LIMIT 5 OFFSET 0")
    List<Movie> loadMovies();

    @Query("SELECT p.link FROM Posters p WHERE p.id = :id")
    String posterLink (@Param("id") Integer id);

    @Query("SELECT p, m FROM Posters p JOIN Movie m ON p.id = m.id")
    List<Object[]> findPostersWithMovie();

    @Query("SELECT a.name FROM Actor a JOIN Movie m ON a.id = m.id WHERE m.name = :nomeFilm")
    List<String> findActorNamesByMovieName(@Param("nomeFilm") String nomeFilm);

    @Query("SELECT a.name FROM Actor a WHERE a.id = :id")
    List<String> findActorsId(@Param("id") Integer id);

    @Query("SELECT c.name FROM Crew c WHERE c.id = :id")
    List<String> getCrew(@Param("id") Integer id);

}
