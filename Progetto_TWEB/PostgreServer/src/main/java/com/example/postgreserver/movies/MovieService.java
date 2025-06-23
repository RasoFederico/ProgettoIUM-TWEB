package com.example.postgreserver.movies;

import com.example.postgreserver.MovieAndPoster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Classe di servizio per le operazioni relative ai film.
 * Questo servizio gestisce la logica di business e le interazioni con il repository dei film.
 */
@Service
public class MovieService {
    private final MovieRepository movieRepository;

    /**
     * Costruisce un'istanza di MovieService con il MovieRepository fornito.
     * Spring inietta automaticamente la dipendenza MovieRepository.
     *
     * @param movieRepository Il repository per accedere ai dati dei film.
     */
    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    /**
     * Cerca i film per titolo e restituisce i dettagli del film insieme ai poster.
     *
     * @param title Il titolo o parte del titolo del film da cercare.
     * @return Una lista di oggetti {@link MovieAndPoster} che contengono i dettagli del film e il relativo poster.
     */
    public List<MovieAndPoster> findByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    /**
     * Carica un elenco di tutti i film disponibili con i relativi poster.
     *
     * @return Una lista di oggetti {@link MovieAndPoster} che contengono i dettagli del film e il relativo poster.
     */
    public List<MovieAndPoster> loadMovies(){
        return movieRepository.loadMovies();
    }

    /**
     * Recupera la lista degli attori associati a un film specifico tramite il suo ID.
     *
     * @param id L'ID del film.
     * @return Una lista di stringhe che rappresentano i nomi degli attori.
     */
    public List<String> getActorsId(Integer id){
        return movieRepository.findActorsId(id);
    }

    /**
     * Recupera la lista dei membri della crew associati a un film specifico tramite il suo ID.
     *
     * @param id L'ID del film.
     * @return Una lista di stringhe che rappresentano i nomi dei membri della crew.
     */
    public List<String> getCrew (Integer id){
        return movieRepository.getCrew(id);
    }

    /**
     * Recupera la lista dei generi associati a un film specifico tramite il suo ID.
     *
     * @param id L'ID del film.
     * @return Una lista di stringhe che rappresentano i generi del film.
     */
    public List<String> getGenres(Integer id){
        return movieRepository.getGenres(id);
    }

}