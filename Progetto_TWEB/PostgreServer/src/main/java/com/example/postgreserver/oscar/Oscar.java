package com.example.postgreserver.oscar;
import jakarta.persistence.*;

@Entity
@Table
public class Oscar {

    @Id
    private Long o_id;
    private int yearFilm;
    private int yearCeremony;
    private int ceremony;
    private String category;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String name;
    private String film;
    private Boolean winner;

    public Oscar() {}
    public Oscar(int yearFilm, int yearCeremony, int ceremony, String category, String name, String film, boolean winner) {
        this.yearFilm = yearFilm;
        this.yearCeremony = yearCeremony;
        this.ceremony = ceremony;
        this.category = category;
        this.name = name;
        this.film = film;
        this.winner = winner;
    }

    public void setO_id(Long o_id) {
        this.o_id = o_id;
    }

    public void setYearFilm(int yearFilm) {
        this.yearFilm = yearFilm;
    }

    public void setYearCeremony(int yearCeremony) {
        this.yearCeremony = yearCeremony;
    }

    public void setCeremony(int ceremony) {
        this.ceremony = ceremony;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public void setWinner(boolean winner) {
        this.winner = winner;
    }

    public Long getO_id() {
        return o_id;
    }

    public int getYearFilm() {
        return yearFilm;
    }

    public int getYearCeremony() {
        return yearCeremony;
    }

    public int getCeremony() {
        return ceremony;
    }

    public String getCategory() {
        return category;
    }

    public String getName() {
        return name;
    }

    public String getFilm() {
        return film;
    }

    public boolean isWinner() {
        return winner;
    }
}
