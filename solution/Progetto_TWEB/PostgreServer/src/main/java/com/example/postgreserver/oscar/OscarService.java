package com.example.postgreserver.oscar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Classe di servizio per le operazioni relative agli Oscar.
 * Questa classe gestisce la logica di business per l'interrogazione delle informazioni sui vincitori di Oscar.
 */
@Service
public class OscarService {
    private final OscarRepository oscarRepository;

    /**
     * Costruisce un'istanza di OscarService con l'OscarRepository fornito.
     * Spring inietterà automaticamente la dipendenza OscarRepository.
     *
     * @param oscarRepository Il repository per accedere ai dati degli Oscar.
     */
    @Autowired
    public OscarService(OscarRepository oscarRepository) {
        this.oscarRepository = oscarRepository;
    }

    /**
     * Verifica se un film con il nome dato ha vinto l'Oscar come Miglior Film.
     *
     * @param name Il nome del film da controllare.
     * @return Un {@link Optional} contenente {@code true} se il film ha vinto l'Oscar,
     * {@code false} se non l'ha vinto, oppure un {@link Optional} vuoto se il film
     * non è stato trovato o non è stato possibile elaborarlo.
     */
    public Optional<Boolean> wonOscar(String name) {
        return oscarRepository.wonOscar(name);
    }
}