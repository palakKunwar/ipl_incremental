package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Cricketer;
import com.edutech.progressive.exception.TeamCricketerLimitExceededException;
import com.edutech.progressive.repository.CricketerRepository;
import com.edutech.progressive.repository.VoteRepository;
import com.edutech.progressive.service.CricketerService;

@Service
public class CricketerServiceImplJpa implements CricketerService {

    private CricketerRepository cricketerRepository;

    @Autowired
    private VoteRepository voteRepository;

    public CricketerServiceImplJpa(CricketerRepository cricketerRepository) {
        this.cricketerRepository = cricketerRepository;
    }

    @Override
    public List<Cricketer> getAllCricketers() throws SQLException {
        return cricketerRepository.findAll();
    }

    @Override
    public Integer addCricketer(Cricketer cricketer) throws SQLException {
        long count = cricketerRepository.countByTeam_TeamId(cricketer.getTeam().getTeamId());
        if (count >= 11) {
            throw new TeamCricketerLimitExceededException(
                    "Team already has maximum limit of 11 cricketers");
        }

        Cricketer savedCricketer = cricketerRepository.save(cricketer);
        return savedCricketer.getCricketerId();
    }

    @Override
    public List<Cricketer> getAllCricketersSortedByExperience() throws SQLException {
        List<Cricketer> cricketers = cricketerRepository.findAll();
        cricketers.sort(Comparator.comparing(Cricketer::getExperience));
        return cricketers;
    }

    @Override
    public void updateCricketer(Cricketer cricketer) throws SQLException {
        Cricketer existingCricketer = cricketerRepository.findByCricketerId(cricketer.getCricketerId());

        if (existingCricketer != null) {
            int existingTeamId = existingCricketer.getTeam().getTeamId();
            int newTeamId = cricketer.getTeam().getTeamId();

            if (existingTeamId != newTeamId) {
                long count = cricketerRepository.countByTeam_TeamId(newTeamId);
                if (count >= 11) {
                    throw new TeamCricketerLimitExceededException(
                            "Team already has maximum limit of 11 cricketers");
                }
            }

            existingCricketer.setTeam(cricketer.getTeam());
            existingCricketer.setCricketerName(cricketer.getCricketerName());
            existingCricketer.setAge(cricketer.getAge());
            existingCricketer.setNationality(cricketer.getNationality());
            existingCricketer.setExperience(cricketer.getExperience());
            existingCricketer.setRole(cricketer.getRole());
            existingCricketer.setTotalRuns(cricketer.getTotalRuns());
            existingCricketer.setTotalWickets(cricketer.getTotalWickets());

            cricketerRepository.save(existingCricketer);
        }
    }

    @Override
    public void deleteCricketer(int cricketerId) throws SQLException {
        voteRepository.deleteByCricketerId(cricketerId);
        cricketerRepository.deleteById(cricketerId);
    }

    @Override
    public Cricketer getCricketerById(int cricketerId) throws SQLException {
        return cricketerRepository.findByCricketerId(cricketerId);
    }

    @Override
    public List<Cricketer> getCricketersByTeam(int teamId) throws SQLException {
        return cricketerRepository.findByTeam_TeamId(teamId);
    }
}