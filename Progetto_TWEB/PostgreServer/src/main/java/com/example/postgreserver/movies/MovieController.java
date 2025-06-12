package com.example.postgreserver.movies;

import com.example.postgreserver.MovieAndPoster;
import com.example.postgreserver.posters.Posters;
import jakarta.persistence.*;
import org.apache.coyote.Request;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import com.example.postgreserver.posters.Posters;

import static java.lang.Integer.parseInt;

@RestController
public class MovieController {
    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    /**
     * Restituisce la lista dei film con i relativi poster.
     * @return
     */
    @GetMapping("/load-movies")
    public List<MovieAndPoster> loadMovies(){
        return movieService.loadMovies();
    }

    /**
     * Restituisce la lista dei film con i relativi poster attraverso una ricerca per nome
     * @param movieName nome del film
     * @return
     */
    @GetMapping("/get-movie-by-name")
    public List<MovieAndPoster> getMovieByName(@RequestParam String movieName){

        System.out.println("Titolo ricevuto: " + movieName);
        return movieService.findByTitle(movieName);
    }

    @PostMapping("/extract-id")
    public int extractId(@RequestBody IdRequest idRequest){
        return movieService.extractId(idRequest.getName(),idRequest.getYear());
    }

    @GetMapping("/get-actors-crew-genres")
    public MovieData getActorsCrewGenres(@RequestParam int movieId){
        List<String> actors = movieService.getActorsId(movieId);
        List<String> crew = movieService.getCrew(movieId);
        List<String> genres = movieService.getGenres(movieId);

        return new MovieData(actors, crew, genres);
    }

    public static class IdRequest{
        private String name;
        private String year;
        public IdRequest(String name, String year){
            this.name = name;
            this.year = year;
        }
        public String getName() {
            return name;
        }
        public int getYear() {
            return parseInt(year);
        }
    }



    public static class MovieData{
        private List<String> actors;
        private List<String> crew;
        private List<String> genres;

        public MovieData(List<String> actors, List<String> crew, List<String> genres){
            this.actors = actors;
            this.crew = crew;
            this.genres = genres;
        }

        public void setActors(List<String> actors) {
            this.actors = actors;
        }

        public void setCrew(List<String> crew) {
            this.crew = crew;
        }

        public void setGenres(List<String> genres) {
            this.genres = genres;
        }

        public List<String> getActors() {
            return actors;
        }

        public List<String> getCrew() {
            return crew;
        }

        public List<String> getGenres() {
            return genres;
        }
    }

}
