package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.edutech.progressive.dao.TeamDAO;
import com.edutech.progressive.entity.Team;
import com.edutech.progressive.service.TeamService;

@Service 
public class TeamServiceImplJdbc implements TeamService {

    public TeamServiceImplJdbc() {
    }
    
   TeamDAO teamDAO;
    public TeamServiceImplJdbc(TeamDAO teamDAO) {
        this.teamDAO = teamDAO;
    }

    @Override
    public List<Team> getAllTeams()throws SQLException {
        return teamDAO.getAllTeams();
    }

    @Override
    public int addTeam(Team team) throws SQLException {
        return teamDAO.addTeam(team);
    }

    @Override
    public List<Team> getAllTeamsSortedByName() throws SQLException{
        List<Team> list = teamDAO.getAllTeams();
        // Collections.sort(list,new Comparator<Team>() {
        //     @Override
        //     public int compare(Team arg0, Team arg1) {
        //         return  arg0.getTeamName().compareTo(arg1.getTeamName());
        //     }
        // });
        Collections.sort(list);
        return list;

    }
    public Team getTeamById(int teamId) throws SQLException
    {
        return teamDAO.getTeamById(teamId);
    }
    public void updateTeam(Team team)throws SQLException
    {
         teamDAO.updateTeam(team);
    }
    public void deleteTeam(int teamId)throws SQLException
    {
        teamDAO.deleteTeam(teamId);
    }

}