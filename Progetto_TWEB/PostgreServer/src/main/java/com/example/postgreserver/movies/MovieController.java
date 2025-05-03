package com.example.postgreserver.movies;

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


    @PostMapping("/get-movie-by-name")
    public List<Movie> getMovieByName(@RequestBody MovieRequest receivedMovie){
        String name = receivedMovie.getName();
        System.out.println("Titolo ricevuto: " + name);
        return movieService.findByTitle(name);
    }

    @PostMapping("/load-movies")
    public List<Movie> loadMovies(){
       /* List <MovieAndPoster> movieAndPosters = new ArrayList<>();
        List<Object[]> results = movieService.loadMoviesAndPosters();
       for(Object[] result : results){
           Posters posters = (Posters) result[0];
           Movie movie = (Movie) result[1];
            MovieAndPoster data = new MovieAndPoster(movie.getId(), movie.getMinute(),movie.getDate(), movie.getName(),movie.getRating(), movie.getTagline(),movie.getDescription(), posters.getLink());
            movieAndPosters.add(data);
       }
        return movieAndPosters;
        List<Movie> movies = movieService.loadMovies();
        List<MovieAndPoster> movieAndPosters = new ArrayList<>();
        for(Movie movie : movies){
            String link = movieService.posterLink(movie.getId());
            MovieAndPoster data = new MovieAndPoster(movie.getId(), movie.getMinute(),movie.getDate(), movie.getName(),movie.getRating(), movie.getTagline(),movie.getDescription(), link);
            movieAndPosters.add(data);
        }
        return movieAndPosters;*/
        return movieService.loadMovies();
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

    public static class MovieAndPoster{
        private Integer id;
        private Integer minute;

        private String date;
        private String name;
        private String rating;
        private String tagline;
        private String description;
        private String posterUrl;

        public MovieAndPoster(Integer id, Integer minute, String date, String name, String rating, String tagline, String description, String posterUrl) {
            this.id = id;
            this.minute = minute;
            this.date = date;
            this.name = name;
            this.rating = rating;
            this.tagline = tagline;
            this.description = description;
            this.posterUrl = posterUrl;
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
