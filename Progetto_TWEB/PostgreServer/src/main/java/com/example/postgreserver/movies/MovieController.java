package com.example.postgreserver.movies;

import com.example.postgreserver.MovieAndPoster;
import com.example.postgreserver.posters.Posters;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import com.example.postgreserver.posters.Posters;

@RestController
public class MovieController {
    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/load-movies")
    public List<MovieAndPoster> loadMovies(){

        System.out.println(movieService.loadMovies());
        return movieService.loadMovies();
    }

    @PostMapping("/get-movie-by-name")
    public List<MovieAndPoster> getMovieByName(@RequestBody MovieRequest receivedMovie){
        String name = receivedMovie.getName();
        System.out.println("Titolo ricevuto: " + name);
        return movieService.findByTitle(name);
    }

    
    @PostMapping("/get-actors")
    public List<String> getActors(@RequestBody MovieId movie_id){
        int id = movie_id.getMovie_id();
        List<String> actors=movieService.getActorsId(id);
        System.out.println(id);
        return actors;
    }

    @PostMapping("/get-crew")
    public List<String> getCrew(@RequestBody MovieId movie_id){
        int id = movie_id.getMovie_id();
        return movieService.getCrew(id);
    }

    public static class MovieRequest{
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class MovieId{
        private int movie_id;
        public int getMovie_id() {
            return movie_id;
        }

        public void setMovie_id(int movie_id) {
            this.movie_id = movie_id;
        }
    }

}
