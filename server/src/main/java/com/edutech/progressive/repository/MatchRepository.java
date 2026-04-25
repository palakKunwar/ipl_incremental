package com.edutech.progressive.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.edutech.progressive.entity.Match;

@Repository
public interface MatchRepository extends JpaRepository<Match,Integer>{

    Match findByMatchId(int matchId);
 
List<Match> findAllByStatus(String status);
 
@Modifying
 
@Transactional
 
@Query("DELETE FROM matches m WHERE m.firstTeam.teamId = :teamId OR m.secondTeam.teamId = :teamId")
 
void deleteByTeamId(@Param("teamId") int teamId);

}