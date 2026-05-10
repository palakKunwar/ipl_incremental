package com.edutech.progressive.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
 
import org.springframework.stereotype.Repository;
import com.edutech.progressive.entity.Team;
@Repository
 
public interface TeamRepository extends JpaRepository<Team, Integer> {
 
    Optional<Team> findByTeamId(int teamId);
   Optional<Team> findByTeamName(String name);
 
}
 