package com.edutech.progressive.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;

import com.edutech.progressive.config.DatabaseConnectionManager;
import com.edutech.progressive.entity.Cricketer;

public class CricketerDAOImpl implements CricketerDAO {

    Connection conn;

    public CricketerDAOImpl() throws SQLException {
        this.conn = DatabaseConnectionManager.getConnection();
    }

    @Override
    public int addCricketer(Cricketer cricketer) throws SQLException {
        String sql = "insert into cricketer (team_id,cricketer_name,age,nationality,experience,role,total_runs,total_wickets) values(?,?,?,?,?,?,?,?)";
        int count = -1;
            PreparedStatement ps = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, cricketer.getTeam().getTeamId());
            ps.setString(2, cricketer.getCricketerName());
            ps.setInt(3, cricketer.getAge());
            ps.setString(4, cricketer.getNationality());
            ps.setInt(5, cricketer.getExperience());
            ps.setString(6, cricketer.getRole());
            ps.setInt(7, cricketer.getTotalRuns());
            ps.setInt(8, cricketer.getTotalWickets());
            count = ps.executeUpdate();
            if(count>0)
                {
               ResultSet rs = ps.getGeneratedKeys();
           if(rs.next())
           {
            cricketer.setCricketerId(rs.getInt(1));
             int key =rs.getInt(1);
             return key;
            }
        }
            return count;
        

    }

    @Override
    public Cricketer getCricketerById(int cricketerId) throws SQLException {

        String sql = "Select * from cricketer where cricketer_id=?";
        Cricketer cricketer = null;
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, cricketerId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                cricketer = new Cricketer(rs.getInt("cricketer_id"), rs.getInt("team_id"), rs.getString("cricketer_name"), rs.getInt("age"), rs.getString("nationality"),
                        rs.getInt("experience"), rs.getString("role"), rs.getInt("total_runs"), rs.getInt("total_wickets"));
            }
        return cricketer;
    }

    @Override
    public void updateCricketer(Cricketer cricketer) throws SQLException{
        String sql = "update cricketer set team_id=?,cricketer_name=?,age=?,nationality=?,experience=?,role=?,total_runs=?,total_wickets=? where cricketer_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, cricketer.getTeam().getTeamId());
            ps.setString(2, cricketer.getCricketerName());
            ps.setInt(3, cricketer.getAge());
            ps.setString(4, cricketer.getNationality());
            ps.setInt(5, cricketer.getExperience());
            ps.setString(6, cricketer.getRole());
            ps.setInt(7, cricketer.getTotalRuns());
            ps.setInt(8, cricketer.getTotalWickets());
            ps.setInt(9, cricketer.getCricketerId());
            ps.executeUpdate();
    }

    @Override
    public void deleteCricketer(int cricketerId) throws SQLException{
        String sql = "delete from cricketer where cricketer_id=?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setInt(1, cricketerId);
            ps.executeUpdate();
    }

    @Override
    public List<Cricketer> getAllCricketers() throws SQLException{
        List<Cricketer> list = new ArrayList<>();
       String sql = "select * from cricketer";
          PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                list.add(new Cricketer(rs.getInt("cricketer_id"), rs.getInt("team_id"), rs.getString("cricketer_name"), rs.getInt("age"), rs.getString("nationality"),
                        rs.getInt("experience"), rs.getString("role"), rs.getInt("total_runs"), rs.getInt("total_wickets")));
            }
       return list;


    }

}