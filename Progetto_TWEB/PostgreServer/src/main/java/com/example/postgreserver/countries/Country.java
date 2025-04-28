package com.example.postgreserver.countries;

import jakarta.persistence.*;

@Entity
@Table
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long c_id;

    private int id;
    private String country;

    public Country() {}

    public Country(int id, String country) {
        this.id = id;
        this.country = country;
    }

    public void setC_id(Long c_id) {
        this.c_id = c_id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Long getC_id() {
        return c_id;
    }

    public int getId() {
        return id;
    }

    public String getCountry() {
        return country;
    }
}