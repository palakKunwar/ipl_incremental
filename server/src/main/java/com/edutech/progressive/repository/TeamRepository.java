package com.edutech.progressive.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutech.progressive.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team findByTeamId(int teamId);

    Team findByTeamName(String teamName);

    // Team findByTeamName(String teamName);
}