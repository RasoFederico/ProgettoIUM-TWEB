package com.example.postgreserver.posters;

import com.example.postgreserver.movies.Movie;
import jakarta.persistence.*;

@Entity
@Table
public class Posters {
    private int id;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long m_id;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String link;



    public Posters() {}

    public Posters(int id, String link) {
        this.id = id;
        this.link = link;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public int getId() {
        return id;
    }

    public String getLink() {
        return link;
    }
}
