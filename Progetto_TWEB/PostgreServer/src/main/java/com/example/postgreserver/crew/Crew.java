package com.example.postgreserver.crew;

import jakarta.persistence.*;

@Entity
@Table
public class Crew {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long c_id;
    private int id;
    private String role;
    private String name;

    public Crew() {}

    public Crew(int id, String role, String name) {
        this.id = id;
        this.role = role;
        this.name = name;
    }

    public void setC_id(Long c_id) {
        this.c_id = c_id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getC_id() {
        return c_id;
    }

    public int getId() {
        return id;
    }

    public String getRole() {
        return role;
    }

    public String getName() {
        return name;
    }
}