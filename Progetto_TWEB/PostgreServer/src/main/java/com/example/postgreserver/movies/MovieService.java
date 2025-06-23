package com.example.postgreserver.movies;

import com.example.postgreserver.MovieAndPoster;
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

    public List<MovieAndPoster> findByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    public List<MovieAndPoster> loadMovies(){
        return movieRepository.loadMovies();
    }

    public List<String> getActorsId(Integer id){
        return movieRepository.findActorsId(id);
    }

    public List<String> getCrew (Integer id){
        return movieRepository.getCrew(id);
    }

    public List<String> getGenres(Integer id){return movieRepository.getGenres(id);}

}
