// package com.edutech.progressive.controller;

// import com.edutech.progressive.entity.Match;
// import com.edutech.progressive.service.MatchService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import java.util.List;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/")
// public class MatchController {

//     @Autowired
//     private MatchService matchService;

//     @GetMapping("/match")
//     public ResponseEntity<List<Match>> getAllMatches() {
//         try {
//             List<Match> matches = matchService.getAllMatches();
//             return new ResponseEntity<>(matches, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @GetMapping("/match/{matchId}")
//     public ResponseEntity<Match> getMatchById(@PathVariable int matchId) {
//         try {
//             Match match = matchService.getMatchById(matchId);
//             return new ResponseEntity<>(match, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @PostMapping("/match")
//     public ResponseEntity<Integer> addMatch(@RequestBody Match match) {
//         try {
//             Integer matchId = matchService.addMatch(match);
//             return new ResponseEntity<>(matchId, HttpStatus.CREATED);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @PutMapping("/match/{matchId}")
//     public ResponseEntity<Void> updateMatch(@PathVariable int matchId, @RequestBody Match match) {
//         try {
//             match.setMatchId(matchId);
//             matchService.updateMatch(match);
//             return new ResponseEntity<>(HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @DeleteMapping("/match/{matchId}")
//     public ResponseEntity<Void> deleteMatch(@PathVariable int matchId) {
//         try {
//             matchService.deleteMatch(matchId);
//             return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @GetMapping("/match/status/{status}")
//     public ResponseEntity<List<Match>> getAllMatchesByStatus(@PathVariable String status) {
//         try {
//             List<Match> matches = matchService.getAllMatchesByStatus(status);
//             return new ResponseEntity<>(matches, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// }



package com.edutech.progressive.controller;

import com.edutech.progressive.entity.Match;
import com.edutech.progressive.exception.NoMatchesFoundException;
import com.edutech.progressive.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.SQLException;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @GetMapping("/match")
    public ResponseEntity<List<Match>> getAllMatches() {
        try {
            List<Match> matches = matchService.getAllMatches();
            return new ResponseEntity<>(matches, HttpStatus.OK);
        } catch (SQLException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/match/{matchId}")
    public ResponseEntity<Match> getMatchById(@PathVariable int matchId) {
        try {
            Match match = matchService.getMatchById(matchId);
            return new ResponseEntity<>(match, HttpStatus.OK);
        } catch (SQLException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/match")
    public ResponseEntity<Integer> addMatch(@RequestBody Match match) {
        try {
            Integer matchId = matchService.addMatch(match);
            return new ResponseEntity<>(matchId, HttpStatus.CREATED);
        } catch (SQLException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/match/{matchId}")
    public ResponseEntity<Void> updateMatch(@PathVariable int matchId, @RequestBody Match match) {
        try {
            match.setMatchId(matchId);
            matchService.updateMatch(match);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (SQLException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/match/{matchId}")
    public ResponseEntity<Void> deleteMatch(@PathVariable int matchId) {
        try {
            matchService.deleteMatch(matchId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (SQLException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/match/status/{status}")
    public ResponseEntity<?> getAllMatchesByStatus(@PathVariable String status) {
        try {
            List<Match> matches = matchService.getAllMatchesByStatus(status);
            return new ResponseEntity<>(matches, HttpStatus.OK);
        } catch (NoMatchesFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}