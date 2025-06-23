package com.example.postgreserver.movies;

import com.example.postgreserver.MovieAndPoster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT new com.example.postgreserver.MovieAndPoster(m, p) FROM Movie m JOIN Posters p ON m.id = p.id WHERE m.id<1000006 ORDER BY m.id LIMIT 5 OFFSET 0")
    List<MovieAndPoster> loadMovies();

    @Query("SELECT new com.example.postgreserver.MovieAndPoster(m, p) FROM Movie m JOIN Posters p ON m.id = p.id WHERE m.name = :title ORDER BY m.id LIMIT 5 OFFSET 0")
    List<MovieAndPoster> findByTitle(@Param("title") String title);

    @Query("SELECT a.name FROM Actor a WHERE a.id = :id")
    List<String> findActorsId(@Param("id") Integer id);

    @Query("SELECT c.name FROM Crew c WHERE c.id = :id")
    List<String> getCrew(@Param("id") Integer id);

    @Query("SELECT g.genre FROM Genres g WHERE g.id = :id")
    List<String> getGenres(@Param("id") Integer id);

}
