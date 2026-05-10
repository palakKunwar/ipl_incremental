package com.edutech.progressive.controller;
import com.edutech.progressive.entity.Team;
import com.edutech.progressive.exception.TeamAlreadyExistsException; 
import com.edutech.progressive.exception.TeamDoesNotExistException; 
import com.edutech.progressive.service.impl.TeamServiceImplArraylist; 
import com.edutech.progressive.service.impl.TeamServiceImplJpa;
 
import org.springframework.beans.factory.annotation.Autowired;
 
import org.springframework.http.HttpStatus;
 
import org.springframework.http.ResponseEntity;
 
import org.springframework.web.bind.annotation.DeleteMapping;
 
import org.springframework.web.bind.annotation.GetMapping;
 
import org.springframework.web.bind.annotation.PathVariable;
 
import org.springframework.web.bind.annotation.PostMapping;
 
import org.springframework.web.bind.annotation.PutMapping;
 
import org.springframework.web.bind.annotation.RequestBody;
 
import org.springframework.web.bind.annotation.RequestMapping;
 
import org.springframework.web.bind.annotation.RestController;
 
import java.sql.SQLException;
 
import java.util.List;
 
@RestController
@RequestMapping("team")
public class TeamController {
 
    @Autowired
    private TeamServiceImplArraylist teamServiceImplArraylist;
 
    @Autowired
    private TeamServiceImplJpa teamServiceImplJpa;
 
    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
 
        try {
 
            List<Team> teamList = teamServiceImplJpa.getAllTeams();
 
            return new ResponseEntity<>(teamList, HttpStatus.OK);
 
        } catch (SQLException e) {
 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
 
        }
 
    }
 
    @GetMapping("/{teamId}")
    public ResponseEntity<?> getTeamById(@PathVariable int teamId) {
 
        try {
 
            Team team = teamServiceImplJpa.getTeamById(teamId);
 
            return new ResponseEntity<>(team, HttpStatus.OK);
 
        } catch (TeamDoesNotExistException e) {
 
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
 
        } catch (Exception e) {
 
            return new ResponseEntity<>("An unexpected error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
 
        }
 
    }
 
    @PostMapping
    public ResponseEntity<?> addTeam(@RequestBody Team team) {
 
        try {
 
            int teamId = teamServiceImplJpa.addTeam(team);
 
            return new ResponseEntity<>(teamId, HttpStatus.CREATED);
 
        } catch (TeamAlreadyExistsException e) {
 
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
 
        } catch (Exception e) {
 
            return new ResponseEntity<>("An unexpected error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);  
 
        }
 
    }
 
      @PutMapping("/{teamId}")
    public ResponseEntity<?> updateTeam(@PathVariable int teamId, @RequestBody Team team) {
 
        try {
 
            team.setTeamId(teamId);
 
            teamServiceImplJpa.updateTeam(team);
 
            return new ResponseEntity<>(HttpStatus.OK);
 
        } catch (TeamAlreadyExistsException e) {
 
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  
 
        } catch (Exception e) {
 
            return new ResponseEntity<>("An unexpected error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);  
 
        }
 
    }
 
 
    @DeleteMapping("{teamId}")
    public ResponseEntity<Void> deleteTeam(@PathVariable int teamId) {
 
        try {
 
            teamServiceImplJpa.deleteTeam(teamId);
 
            return ResponseEntity.noContent().build();
 
        } catch (SQLException e) {
 
 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
 
        }
 
    }
 
    @GetMapping("fromArrayList")
    public ResponseEntity<List<Team>> getAllTeamsFromArrayList() {
 
        try {
 
            List<Team> teams = teamServiceImplArraylist.getAllTeams();
 
            return ResponseEntity.ok(teams);
 
        }
 
        catch (Exception e) {
 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
 
        }
 
    }
 
    @PostMapping("toArrayList")
    public ResponseEntity<Integer> addTeamToArrayList(Team team) {
 
        try {
 
            Integer i = teamServiceImplArraylist.addTeam(team);
 
            return ResponseEntity.status(HttpStatus.CREATED).body(i);
 
        }
 
        catch (Exception e)
 
        {
 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
 
        }
 
    }
 
    @GetMapping("fromArrayList/sorted")
    public ResponseEntity<List<Team>> getAllTeamsSortedByNameFromArrayList() {
 
        try {
 
            List<Team> ls = teamServiceImplArraylist.getAllTeamsSortedByName();
 
            return ResponseEntity.ok(ls);
 
        }
 
        catch (Exception e)
 
        {
 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
 
        }
 
    }
 
}