package com.example.postgreserver.posters;

import jakarta.persistence.*;

@Entity
@Table
public class Posters {

    private int id;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long p_id;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String link;

    public Posters() {}

    public Posters(int id, String link) {
        this.id = id;
        this.link = link;
    }

    public void setP_id(Long p_id) {
        this.p_id = p_id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Long getP_id() {
        return p_id;
    }

    public int getId() {
        return id;
    }

    public String getLink() {
        return link;
    }
}
