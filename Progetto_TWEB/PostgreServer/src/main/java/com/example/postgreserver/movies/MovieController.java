package com.example.postgreserver.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
public class MovieController {
    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/get-movie-by-name")
    public Optional<Movie> getMovieByName(@RequestBody MovieRequest receivedMovie){
        String name = receivedMovie.getName();
        Optional<Movie> movie = movieService.findByTitle(name);
        return movie;
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
}
