package com.edutech.progressive.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "team")
@JsonIgnoreProperties({"cricketers", "firstTeamMatches", "secondTeamMatches", "wonMatches"})
public class Team implements Comparable<Team> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private int teamId;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "location")
    private String location;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "establishment_year")
    private int establishmentYear;

    @OneToMany(mappedBy = "team")
    private List<Cricketer> cricketers;

    @OneToMany(mappedBy = "firstTeam")
    private List<Match> firstTeamMatches;

    @OneToMany(mappedBy = "secondTeam")
    private List<Match> secondTeamMatches;

    @OneToMany(mappedBy = "winnerTeam")
    private List<Match> wonMatches;

    public Team() {
    }

    public Team(int teamId, String teamName, String location, String ownerName, int establishmentYear,
            List<Cricketer> cricketers, List<Match> firstTeamMatches, List<Match> secondTeamMatches,
            List<Match> wonMatches) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.location = location;
        this.ownerName = ownerName;
        this.establishmentYear = establishmentYear;
        this.cricketers = cricketers;
        this.firstTeamMatches = firstTeamMatches;
        this.secondTeamMatches = secondTeamMatches;
        this.wonMatches = wonMatches;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public int getEstablishmentYear() {
        return establishmentYear;
    }

    public void setEstablishmentYear(int establishmentYear) {
        this.establishmentYear = establishmentYear;
    }

    public List<Cricketer> getCricketers() {
        return cricketers;
    }

    public void setCricketers(List<Cricketer> cricketers) {
        this.cricketers = cricketers;
    }

    public List<Match> getFirstTeamMatches() {
        return firstTeamMatches;
    }

    public void setFirstTeamMatches(List<Match> firstTeamMatches) {
        this.firstTeamMatches = firstTeamMatches;
    }

    public List<Match> getSecondTeamMatches() {
        return secondTeamMatches;
    }

    public void setSecondTeamMatches(List<Match> secondTeamMatches) {
        this.secondTeamMatches = secondTeamMatches;
    }

    public List<Match> getWonMatches() {
        return wonMatches;
    }

    public void setWonMatches(List<Match> wonMatches) {
        this.wonMatches = wonMatches;
    }

    @Override
    public int compareTo(Team o) {
        return this.getTeamName().compareTo(o.getTeamName());
    }
}