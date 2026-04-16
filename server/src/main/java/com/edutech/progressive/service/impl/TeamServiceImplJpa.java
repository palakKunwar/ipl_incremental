package com.edutech.progressive.service.impl;

import com.edutech.progressive.entity.Cricketer;
import com.edutech.progressive.entity.Team;
import com.edutech.progressive.exception.TeamAlreadyExistsException;
import com.edutech.progressive.exception.TeamDoesNotExistException;
import com.edutech.progressive.repository.CricketerRepository;
import com.edutech.progressive.repository.MatchRepository;
import com.edutech.progressive.repository.TeamRepository;
import com.edutech.progressive.repository.TicketBookingRepository;
import com.edutech.progressive.repository.VoteRepository;
import com.edutech.progressive.service.TeamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

@Service
@Primary
public class TeamServiceImplJpa implements TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private CricketerRepository cricketerRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private TicketBookingRepository ticketBookingRepository;

    public TeamServiceImplJpa() {
    }

    public TeamServiceImplJpa(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeams() throws SQLException {
        return teamRepository.findAll();
    }

    public int addTeam(Team team) throws SQLException {
        Team existingTeam = teamRepository.findByTeamName(team.getTeamName());
        if (existingTeam != null) {
            throw new TeamAlreadyExistsException("Team already exists with name: " + team.getTeamName());
        }
        return teamRepository.save(team).getTeamId();
    }

    public List<Team> getAllTeamsSortedByName() throws SQLException {
        List<Team> teams = teamRepository.findAll();
        Collections.sort(teams);
        return teams;
    }

    public Team getTeamById(int teamId) throws SQLException {
        Team team = teamRepository.findByTeamId(teamId);
        if (team == null) {
            throw new TeamDoesNotExistException("Team with id: " + teamId + " does not exist");
        }
        return team;
    }

    public void updateTeam(Team team, int teamId) throws SQLException {
        Team existingTeam = teamRepository.findByTeamId(teamId);
        if (existingTeam == null) {
            throw new TeamDoesNotExistException("Team with id: " + teamId + " does not exist");
        }

        Team teamWithSameName = teamRepository.findByTeamName(team.getTeamName());
        if (teamWithSameName != null && teamWithSameName.getTeamId() != teamId) {
            throw new TeamAlreadyExistsException("Team already exists with name: " + team.getTeamName());
        }

        existingTeam.setTeamName(team.getTeamName());
        existingTeam.setLocation(team.getLocation());
        existingTeam.setEstablishmentYear(team.getEstablishmentYear());
        existingTeam.setOwnerName(team.getOwnerName());

        teamRepository.save(existingTeam);
    }

    public void deleteTeam(int teamId) throws SQLException {
        voteRepository.deleteByTeamId(teamId);

        List<Cricketer> cricketers = cricketerRepository.findByTeam_TeamId(teamId);
        for (Cricketer cricketer : cricketers) {
            voteRepository.deleteByCricketerId(cricketer.getCricketerId());
        }

        ticketBookingRepository.deleteByTeamId(teamId);
        matchRepository.deleteByTeamId(teamId);
        cricketerRepository.deleteByTeamId(teamId);
        teamRepository.deleteById(teamId);
    }
}