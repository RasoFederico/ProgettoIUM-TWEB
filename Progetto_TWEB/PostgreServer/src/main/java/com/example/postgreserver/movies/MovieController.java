package com.example.postgreserver.movies;

import com.example.postgreserver.MovieAndPoster;
import com.example.postgreserver.posters.Posters;
import jakarta.persistence.*;
import org.apache.coyote.Request;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import com.example.postgreserver.posters.Posters;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;


import static java.lang.Integer.parseInt;

@RestController
public class MovieController {

    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @Operation(summary = "Ottieni un elenco di tutti i film con i loro poster",
            description = "Recupera un elenco completo di film, inclusi i loro dettagli e le immagini dei poster associati.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Elenco di film recuperato con successo",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = MovieAndPoster.class)))),
            @ApiResponse(responseCode = "500", description = "Errore interno del server",content=@Content)
    })
    @GetMapping("/load-movies")
    public List<MovieAndPoster> loadMovies(){
        return movieService.loadMovies();
    }

    @Operation(summary = "Cerca film per nome",
            description = "Recupera un elenco di film e i loro poster in base a un nome di film fornito. La ricerca è insensibile alle maiuscole e può essere parziale.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Film corrispondenti ai criteri recuperati con successo",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = MovieAndPoster.class)))),
            @ApiResponse(responseCode = "400", description = "Nome del film non valido fornito",content=@Content),
            @ApiResponse(responseCode = "404", description = "Nessun film trovato con il nome dato",content=@Content),
            @ApiResponse(responseCode = "500", description = "Errore interno del server",content=@Content)
    })
    @GetMapping("/get-movie-by-name")
    public List<MovieAndPoster> getMovieByName(@Parameter(description = "Nome del film da cercare", required = true) @RequestParam String movieName){
        System.out.println("Titolo ricevuto: " + movieName);
        return movieService.findByTitle(movieName);
    }

    @Operation(summary = "Ottieni informazioni dettagliate per un film specifico",
            description = "Recupera attori, membri della troupe e generi associati a un dato ID di film.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dettagli del film recuperati con successo",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = MovieData.class))),
            @ApiResponse(responseCode = "400", description = "ID del film non valido fornito",content=@Content),
            @ApiResponse(responseCode = "404", description = "Film non trovato con l'ID fornito",content=@Content),
            @ApiResponse(responseCode = "500", description = "Errore interno del server",content=@Content)
    })
    @GetMapping("/get-actors-crew-genres")
    public MovieData getActorsCrewGenres(@Parameter(description = "ID del film di cui recuperare i dettagli", required = true) @RequestParam int movieId){
        List<String> actors = movieService.getActorsId(movieId);
        List<String> crew = movieService.getCrew(movieId);
        List<String> genres = movieService.getGenres(movieId);

        return new MovieData(actors, crew, genres);
    }

    @Schema(description = "Struttura dati per informazioni dettagliate sul film")
    public static class MovieData{
        @Schema(description = "Elenco degli attori nel film")
        private List<String> actors;
        @Schema(description = "Elenco dei membri della troupe per il film")
        private List<String> crew;
        @Schema(description = "Elenco dei generi associati al film")
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
