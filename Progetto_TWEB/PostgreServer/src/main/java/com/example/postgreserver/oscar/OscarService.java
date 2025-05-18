package com.example.postgreserver.oscar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OscarService {
    private final OscarRepository oscarRepository;

    @Autowired
    public OscarService(OscarRepository oscarRepository) {this.oscarRepository = oscarRepository;}

    public Optional<Boolean> wonOscar(String name){return oscarRepository.wonOscar(name);}

}
