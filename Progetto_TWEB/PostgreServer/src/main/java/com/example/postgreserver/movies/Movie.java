package com.example.postgreserver.movies;

import com.example.postgreserver.posters.Posters;
import jakarta.persistence.*;

@Entity
@Table
public class Movie {
    @Id
    private Long m_id;

    private int id;
    private int minute;
    private String date;
    private String name;
    private String rating;
    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String description;


    public Movie() {}

    public Movie(Integer id, String name, String date, String tagline, String description, Integer minute, String rating) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.tagline = tagline;
        this.description = description;
        this.minute = minute;
        this.rating = rating;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDate() {
        return date;
    }

    public String getTagline() {
        return tagline;
    }

    public String getDescription() {
        return description;
    }

    public Integer getMinute() {
        return minute;
    }

    public String getRating() {
        return rating;
    }
}