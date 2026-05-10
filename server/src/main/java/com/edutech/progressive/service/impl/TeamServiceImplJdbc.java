package com.edutech.progressive.service.impl;

import java.sql.SQLException;

import java.util.Collections;

import java.util.List;
 
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.stereotype.Service;

import com.edutech.progressive.dao.TeamDAO;

import com.edutech.progressive.entity.Team;

import com.edutech.progressive.service.TeamService;

@Service("teamServiceImplJdbc")

public class TeamServiceImplJdbc  implements TeamService{

    private TeamDAO teamDAO;

 
    public TeamServiceImplJdbc(@Qualifier("teamDAOImpl") TeamDAO teamDAO) {

        this.teamDAO = teamDAO;

    }

    @Override

    public List<Team> getAllTeams() throws SQLException{

        try{

            return teamDAO.getAllTeams();

        }

        catch(SQLException e)

        {

            throw e;

        }

        finally{

        }

    }

    @Override

    public int addTeam(Team team)throws SQLException {

       try{

        return teamDAO.addTeam(team);

       }

       catch(SQLException e)

       {

        throw e;

       }

    }

    @Override

    public List<Team> getAllTeamsSortedByName()throws SQLException {

        List<Team> sortTeams=teamDAO.getAllTeams();

        Collections.sort(sortTeams);

        return sortTeams;

    }

    // @Override

    // public void emptyArrayList() throws SQLException{

    // }

    public Team getTeamById(int teamId)throws SQLException {

        try{

        return teamDAO.getTeamById(teamId);

       }

       catch(SQLException e)

       {

        throw e;

       }

    }

    public void updateTeam(Team team) throws SQLException{

        try{

        teamDAO.updateTeam(team);

       }

       catch(SQLException e)

       {

        throw e;

       }

    }

    public void deleteTeam(int teamId) throws SQLException{

        try{

        teamDAO.deleteTeam(teamId);

       }

       catch(SQLException e)

       {

        throw e;

       }

    }
 
}
 