package com.example.postgreserver.posters;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostersRepository extends JpaRepository<Posters, Long> {

}