package com.edutech.progressive.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Team;
import com.edutech.progressive.service.TeamService;

@Service
public class TeamServiceImplArraylist implements TeamService {

    List<Team> list = new ArrayList<>();
    @Override
    public List<Team> getAllTeams() {
       
        return list;
    }

    @Override
    public int addTeam(Team team) {
        list.add(team);
        return list.size();
    }
    @Override
    public List<Team> getAllTeamsSortedByName() {
    
    Collections.sort(list);
       return list;

    }

    public void emptyArrayList()
    {
        list = new ArrayList<>();
    }

}