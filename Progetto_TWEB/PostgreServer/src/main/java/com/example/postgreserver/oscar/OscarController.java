package com.example.postgreserver.oscar;


import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class OscarController {
    private OscarService oscarService;

    public OscarController(OscarService oscarService) {this.oscarService = oscarService;}

    @PostMapping("/won-oscar")
    public Optional<Boolean> wonOscar(@RequestBody MovieRequest movie){
        Optional<Boolean> x = oscarService.wonOscar(movie.getMovie_name());

        
        return x;
    }

    public static class MovieRequest{
        private String movie_name;

        public String getMovie_name() {
            return movie_name;
        }

        public void setMovie_name(String movie_name) {
            this.movie_name = movie_name;
        }
    }
}
