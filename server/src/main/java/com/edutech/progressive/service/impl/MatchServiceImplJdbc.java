package com.edutech.progressive.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.edutech.progressive.dao.MatchDAO;
import com.edutech.progressive.entity.Match;
import com.edutech.progressive.service.MatchService;
@Service("matchServiceImplJdbc")
public class MatchServiceImplJdbc implements MatchService {
    private MatchDAO matchDAO;
    

    public MatchServiceImplJdbc(@Qualifier("matchDAOImpl") MatchDAO matchDAO) {
        this.matchDAO = matchDAO;
    }

    @Override
    public List<Match> getAllMatches()throws SQLException {
        try{
            return matchDAO.getAllMatches();
        }
        catch(SQLException e)
        {
            throw e;
        }
        finally{

        }

        
    }

    @Override
    public Match getMatchById(int matchId) throws SQLException{
       try{
            return matchDAO.getMatchById(matchId);
        }
        catch(SQLException e)
        {
            throw e;
        }
    }

    @Override
    public Integer addMatch(Match match) throws SQLException{
        try{
        return matchDAO.addMatch(match);
       }
       catch(SQLException e)
       {
        throw e;
       }
    }

    @Override
    public void updateMatch(Match match) throws SQLException{
        try{
            matchDAO.updateMatch(match);
        }
        catch(SQLException e)
        {
            throw e;
        }
    }

    @Override
    public void deleteMatch(int matchId) throws SQLException{
        matchDAO.deleteMatch(matchId);
    }

}