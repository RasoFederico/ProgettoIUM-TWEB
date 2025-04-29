package com.example.postgreserver.posters;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class PostersController {
    private PostersService postersService;

    public PostersController(PostersService postersService) {
        this.postersService = postersService;
    }


    @PostMapping("/get-img-by-idMovie")
    public List<Posters> getMovieByName(@RequestBody com.example.postgreserver.posters.PostersController.PostersRequest receivedPosters){
        Integer id = receivedPosters.getId();
        System.out.println("Id ricevuto: " + id);
        return postersService.findByIdMovie(id);
    }

    public static class PostersRequest{
        private Integer id;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }
    }
}