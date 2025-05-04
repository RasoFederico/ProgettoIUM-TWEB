package com.example.postgreserver;

import com.example.postgreserver.movies.Movie;
import com.example.postgreserver.posters.Posters;

public class MovieAndPoster {

    private Movie movie;
    private Posters posters;

    public MovieAndPoster(Movie movie, Posters posters) {
        this.movie = movie;
        this.posters = posters;
    }

    public Movie getMovie() {
        return movie;
    }

    public Posters getPosters() {
        return posters;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public void setPosters(Posters posters) {
        this.posters = posters;
    }
}
