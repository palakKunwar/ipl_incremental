// package com.edutech.progressive.repository;

// import java.util.List;
// import java.util.Optional;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.edutech.progressive.entity.Cricketer;

// public interface CricketerRepository extends JpaRepository<Cricketer, Integer> {

//     Optional<Cricketer> findByCricketerId(int cricketerId);

//     List<Cricketer> findByTeam_TeamId(int teamId);
// }


package com.edutech.progressive.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.edutech.progressive.entity.Cricketer;

public interface CricketerRepository extends JpaRepository<Cricketer, Integer> {

    Cricketer findByCricketerId(int cricketerId);

    List<Cricketer> findByTeam_TeamId(int teamId);

    long countByTeam_TeamId(int teamId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Cricketer c WHERE c.team.teamId = ?1")
    void deleteByTeamId(int teamId);
}