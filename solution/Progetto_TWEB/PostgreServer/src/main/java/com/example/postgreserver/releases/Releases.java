package com.example.postgreserver.releases;

import jakarta.persistence.*;

@Entity
@Table
public class Releases {

    @Id
    private Long r_id;

    private int id;
    private String country;
    private String date;
    private String type;
    private String rating;

    public Releases() {}

    public Releases(int id, String country, String date, String type, String rating) {
        this.id = id;
        this.country = country;
        this.date = date;
        this.type = type;
        this.rating = rating;
    }

    public void setR_id(Long r_id) {
        this.r_id = r_id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public Long getR_id() {
        return r_id;
    }

    public int getId() {
        return id;
    }

    public String getCountry() {
        return country;
    }

    public String getDate() {
        return date;
    }

    public String getType() {
        return type;
    }

    public String getRating() {
        return rating;
    }
}