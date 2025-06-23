package com.example.postgreserver.oscar;


import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/oscars") // Aggiunto il mapping base per chiarezza
public class OscarController {
    private OscarService oscarService;

    public OscarController(OscarService oscarService) {this.oscarService = oscarService;}


    @Operation(summary = "Verifica se un film ha vinto l'Oscar come miglior film",
            description = "Controlla se un film specifico, identificato dal suo nome, ha vinto l'Oscar per il 'Miglior Film'.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Verifica completata con successo",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(type = "boolean", example = "true"))),
            @ApiResponse(responseCode = "400", description = "Nome del film non valido fornito",content=@Content),
            @ApiResponse(responseCode = "404", description = "Film non trovato o non presente nei dati degli Oscar",content=@Content),
            @ApiResponse(responseCode = "500", description = "Errore interno del server durante la verifica",content=@Content)
    })
    @GetMapping ("/won-oscar")
    public Optional<Boolean> wonOscar(@Parameter(description = "Il nome del film da verificare", required = true, example = "Parasite") @RequestParam String movie){
        Optional<Boolean> x = oscarService.wonOscar(movie);
        return x;
    }
}