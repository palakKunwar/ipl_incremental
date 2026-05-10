package com.edutech.progressive.service.impl;

import java.util.ArrayList;

import java.util.Collections;

import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Team;

import com.edutech.progressive.service.TeamService;

@Service("teamServiceImplArraylist")

public class TeamServiceImplArraylist implements TeamService{
 
     private static List<Team> lt=new ArrayList<>();

    @Override

     public List<Team> getAllTeams() {

        return new ArrayList<>(lt);

    }

    @Override

    public int addTeam(Team team) {

       lt.add(team);

       return lt.size();

    }

    @Override

    public List<Team> getAllTeamsSortedByName() {

       List<Team> copy=new ArrayList<>(lt);

       Collections.sort(copy);

       return copy;

    }

    @Override

    public void emptyArrayList() {

       lt.clear();

    }
 
}
 