package com.example.postgreserver.actors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActorRepository  extends JpaRepository<Actor, Long> {
}
