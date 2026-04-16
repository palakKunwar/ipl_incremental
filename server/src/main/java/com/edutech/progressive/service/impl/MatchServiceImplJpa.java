// package com.edutech.progressive.service.impl;

// import java.sql.SQLException;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.edutech.progressive.entity.Match;
// import com.edutech.progressive.repository.MatchRepository;
// import com.edutech.progressive.service.MatchService;

// @Service
// public class MatchServiceImplJpa implements MatchService {

//     @Autowired
//     private MatchRepository matchRepository;

//     public MatchServiceImplJpa() {
//     }

//     public MatchServiceImplJpa(MatchRepository matchRepository) {
//         this.matchRepository = matchRepository;
//     }

//     @Override
//     public List<Match> getAllMatches() throws SQLException {
//         return matchRepository.findAll();
//     }

//     @Override
//     public Match getMatchById(int matchId) throws SQLException {
//         return matchRepository.findByMatchId(matchId);
//     }

//     @Override
//     public Integer addMatch(Match match) throws SQLException {
//         Match savedMatch = matchRepository.save(match);
//         return savedMatch.getMatchId();
//     }

//     @Override
//     public void updateMatch(Match match) throws SQLException {
//         Match existingMatch = matchRepository.findByMatchId(match.getMatchId());

//         if (existingMatch != null) {
//             existingMatch.setFirstTeam(match.getFirstTeam());
//             existingMatch.setSecondTeam(match.getSecondTeam());
//             existingMatch.setMatchDate(match.getMatchDate());
//             existingMatch.setVenue(match.getVenue());
//             existingMatch.setResult(match.getResult());
//             existingMatch.setStatus(match.getStatus());
//             existingMatch.setWinnerTeam(match.getWinnerTeam());

//             matchRepository.save(existingMatch);
//         }
//     }

//     @Override
//     public void deleteMatch(int matchId) throws SQLException {
//         matchRepository.deleteById(matchId);
//     }

//     @Override
//     public List<Match> getAllMatchesByStatus(String status) {
//         return matchRepository.findAllByStatus(status);
//     }
// }


package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Match;
import com.edutech.progressive.exception.NoMatchesFoundException;
import com.edutech.progressive.repository.MatchRepository;
import com.edutech.progressive.service.MatchService;

@Service
public class MatchServiceImplJpa implements MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public MatchServiceImplJpa() {
    }

    public MatchServiceImplJpa(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    @Override
    public List<Match> getAllMatches() throws SQLException {
        return matchRepository.findAll();
    }

    @Override
    public Match getMatchById(int matchId) throws SQLException {
        return matchRepository.findByMatchId(matchId);
    }

    @Override
    public Integer addMatch(Match match) throws SQLException {
        Match savedMatch = matchRepository.save(match);
        return savedMatch.getMatchId();
    }

    @Override
    public void updateMatch(Match match) throws SQLException {
        Match existingMatch = matchRepository.findByMatchId(match.getMatchId());

        if (existingMatch != null) {
            existingMatch.setFirstTeam(match.getFirstTeam());
            existingMatch.setSecondTeam(match.getSecondTeam());
            existingMatch.setMatchDate(match.getMatchDate());
            existingMatch.setVenue(match.getVenue());
            existingMatch.setResult(match.getResult());
            existingMatch.setStatus(match.getStatus());
            existingMatch.setWinnerTeam(match.getWinnerTeam());

            matchRepository.save(existingMatch);
        }
    }

    @Override
    public void deleteMatch(int matchId) throws SQLException {
        matchRepository.deleteById(matchId);
    }

    @Override
    public List<Match> getAllMatchesByStatus(String status) {
        List<Match> matches = matchRepository.findAllByStatus(status);
        if (matches == null || matches.isEmpty()) {
            throw new NoMatchesFoundException("No matches found with status: " + status);
        }
        return matches;
    }
}