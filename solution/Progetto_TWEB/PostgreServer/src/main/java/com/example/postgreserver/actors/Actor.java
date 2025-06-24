package com.example.postgreserver.actors;

import jakarta.persistence.*;

@Entity
@Table
public class Actor {

    @Id
    private Long a_id;

    private int id;
    private String name;
    private String role;

    public Actor() {}

    public Actor(int id, String name, String role) {
        this.id = id;
        this.name = name;
        this.role = role;
    }

    public void setA_id(Long a_id) {
        this.a_id = a_id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getA_id() {
        return a_id;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }
}
