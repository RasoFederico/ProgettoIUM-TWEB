package com.example.postgreserver.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> findByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    public List<Movie> loadMovies(){
        return movieRepository.loadMovies();
    }

    public String posterLink(Integer id){
        return movieRepository.posterLink(id);
    }

    public List<Object[]> loadMoviesAndPosters(){
        return movieRepository.findPostersWithMovie();
    }
}
