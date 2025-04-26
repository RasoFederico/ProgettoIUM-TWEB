package com.example.postgreserver.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
public class MovieController {
    private MovieService movieService;

    @PostMapping("/get-movie-by-name")
    public Optional<Movie> getMovieByName(@RequestBody String name){
        Optional<Movie> movie = movieService.findByTitle(name);
        return movie;
    }

}
