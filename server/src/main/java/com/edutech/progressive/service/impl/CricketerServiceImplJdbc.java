package com.edutech.progressive.service.impl;

import com.edutech.progressive.dao.CricketerDAO;
import com.edutech.progressive.entity.Cricketer;
import com.edutech.progressive.service.CricketerService;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;


@Service("cricketerServiceImplJdbc")

public class CricketerServiceImplJdbc  implements CricketerService{
    private final CricketerDAO cricketerDAO;
    

    public CricketerServiceImplJdbc(@Qualifier("cricketerDAOImpl") CricketerDAO cricketerDAO) {
        this.cricketerDAO = cricketerDAO;
    }


    @Override
    public List<Cricketer> getAllCricketers() throws SQLException {
        try{
            return cricketerDAO.getAllCricketers();
        }
        catch(SQLException e)
        {
            throw e;
        }
        finally{

        }

    }


    @Override
    public Integer addCricketer(Cricketer cricketer) throws SQLException {
       try{
        return cricketerDAO.addCricketer(cricketer);
       }
       catch(SQLException e)
       {
        throw e;
       }
    }


    @Override
    public List<Cricketer> getAllCricketersSortedByExperience() throws SQLException {
       try{
        List<Cricketer> sortCricketers=cricketerDAO.getAllCricketers();
        Collections.sort(sortCricketers);
        return sortCricketers;
       }
       catch(SQLException e){
        throw e;


       }
       finally{}
    }

    @Override
    public void updateCricketer(Cricketer cricketer) throws SQLException 
    {
        try{
            cricketerDAO.updateCricketer(cricketer);
        }
        catch(SQLException e)
        {
            throw e;
        }
    }

    @Override
    public void deleteCricketer(int cricketerId) throws SQLException
    {
        cricketerDAO.deleteCricketer(cricketerId);
    }

    @Override
    public Cricketer getCricketerById(int cricketerId) throws SQLException
    {
        try{
            return cricketerDAO.getCricketerById(cricketerId);
        }
        catch(SQLException e)
        {
            throw e;
        }
    }



}