package com.example.postgreserver.genres;

import jakarta.persistence.*;

@Entity
@Table
public class Genres {

    @Id
    private Long g_id;

    private int id;
    private String genre;

    public Genres(){}

    public Genres(int id, String genre) {
        this.id = id;
        this.genre = genre;
    }

    public void setG_id(Long g_id) {
        this.g_id = g_id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Long getG_id() {
        return g_id;
    }

    public int getId() {
        return id;
    }

    public String getGenre() {
        return genre;
    }
}
