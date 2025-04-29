package com.example.postgreserver.posters;

import com.example.postgreserver.posters.Posters;
import com.example.postgreserver.posters.PostersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostersService {
    private final PostersRepository postersRepository;

    @Autowired
    public PostersService(PostersRepository postersRepository) {
        this.postersRepository = postersRepository;
    }

    public List<Posters> findByIdMovie(Integer id) {
        return postersRepository.findByIdMovie(id);
    }

}
