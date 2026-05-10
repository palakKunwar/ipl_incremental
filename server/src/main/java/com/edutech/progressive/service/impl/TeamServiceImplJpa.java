package com.edutech.progressive.service.impl;

 
 
import com.edutech.progressive.entity.Team;
 
import com.edutech.progressive.exception.TeamAlreadyExistsException;
 
import com.edutech.progressive.exception.TeamDoesNotExistException;
 
import com.edutech.progressive.repository.*;
 
import com.edutech.progressive.service.TeamService;
 
import org.springframework.beans.factory.annotation.Autowired;
 
import org.springframework.stereotype.Service;
 
import java.sql.SQLException;
 
import java.util.Comparator;
 
import java.util.List;
 
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
 
@Service
 
public class TeamServiceImplJpa  implements TeamService {
 
    private TeamRepository teamRepository;
    @Autowired
 
    private CricketerRepository cricketerRepository;
    @Autowired
 
    private MatchRepository matchRepository;
    @Autowired
 
    private VoteRepository voteRepository;
      @Autowired
 
    private TicketBookingRepository ticketBookingRepository;
    @Autowired
 
    public TeamServiceImplJpa(TeamRepository teamRepository) {
 
        this.teamRepository = teamRepository;
 
    }
    @Override
 
    public List<Team> getAllTeams() throws SQLException {
 
        return teamRepository.findAll();
 
    }
    @Override
 
    public int addTeam(Team team) throws SQLException {
        Optional<Team> t = teamRepository.findByTeamName(team.getTeamName());
        if(t.isPresent()){
 
            throw new TeamAlreadyExistsException("Team with same name exists");
 
        }
 
        return teamRepository.save(team).getTeamId();
 
    }
    @Override
 
    public List<Team> getAllTeamsSortedByName() throws SQLException {
 
        List<Team> sortedTeam = teamRepository.findAll();
 
        sortedTeam.sort(Comparator.comparing(Team::getTeamName));
 
        return sortedTeam;
 
    }
    @Override
 
    public Team getTeamById(int teamId) throws SQLException {
 
        if(teamRepository.findByTeamId(teamId) == null){
 
            throw new TeamDoesNotExistException("Team does not exist");
 
        }
 
        return teamRepository.findByTeamId(teamId).orElse(null);
 
    }
    @Override
 
    public void updateTeam(Team team) throws SQLException {
        // Team current=teamRepository.findByTeamId(team.getTeamId()).orElseThrow();
        // if(current==null)
        // {
        //     throw new EntityNotFoundException("Team not found");
        // }

        // Team existingTeam=teamRepository.findByTeamName(team.getTeamName()).orElseThrow();
        // if(existingTeam!=null && existingTeam.getTeamId()!=team.getTeamId()){
 
        //     throw new TeamAlreadyExistsException("Team with same name exists");
 
        // }
        teamRepository.save(team);
 
    }
    @Override
 
    public void deleteTeam(int teamId) throws SQLException {
 
        voteRepository.deleteByTeamId(teamId);
 
        ticketBookingRepository.deleteByTeamId(teamId);
 
        matchRepository.deleteByTeamId(teamId);
 
        cricketerRepository.deleteByTeamId(teamId);
 
        teamRepository.deleteById(teamId);
 
    }
 
}