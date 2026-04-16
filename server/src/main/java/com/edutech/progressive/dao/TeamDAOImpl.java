package com.edutech.progressive.dao;

import com.edutech.progressive.config.DatabaseConnectionManager;
import com.edutech.progressive.entity.Team;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TeamDAOImpl implements TeamDAO {

    @Override
    public int addTeam(Team team) throws SQLException {
        String sql = "INSERT INTO team (team_name, location, owner_name, establishment_year) VALUES (?, ?, ?, ?)";

        try (Connection connection = DatabaseConnectionManager.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            statement.setString(1, team.getTeamName());
            statement.setString(2, team.getLocation());
            statement.setString(3, team.getOwnerName());
            statement.setInt(4, team.getEstablishmentYear());

            statement.executeUpdate();

            try (ResultSet resultSet = statement.getGeneratedKeys()) {
                if (resultSet.next()) {
                    int generatedID = resultSet.getInt(1);
                    team.setTeamId(generatedID);
                    return generatedID;
                }
            }
        }

        return -1;
    }

    @Override
    public Team getTeamById(int teamId) throws SQLException {
        String sql = "SELECT * FROM team WHERE team_id = ?";

        try (Connection connection = DatabaseConnectionManager.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, teamId);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    Team team = new Team();
                    team.setTeamId(teamId);
                    team.setTeamName(resultSet.getString("team_name"));
                    team.setLocation(resultSet.getString("location"));
                    team.setOwnerName(resultSet.getString("owner_name"));
                    team.setEstablishmentYear(resultSet.getInt("establishment_year"));
                    return team;
                }
            }
        }

        return null;
    }

    @Override
    public void updateTeam(Team team) throws SQLException {
        String sql = "UPDATE team SET team_name = ?, location = ?, owner_name = ?, establishment_year = ? WHERE team_id = ?";

        try (Connection connection = DatabaseConnectionManager.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, team.getTeamName());
            statement.setString(2, team.getLocation());
            statement.setString(3, team.getOwnerName());
            statement.setInt(4, team.getEstablishmentYear());
            statement.setInt(5, team.getTeamId());

            statement.executeUpdate();
        }
    }

    @Override
    public void deleteTeam(int teamId) throws SQLException {
        String sql = "DELETE FROM team WHERE team_id = ?";

        try (Connection connection = DatabaseConnectionManager.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, teamId);
            statement.executeUpdate();
        }
    }

    @Override
    public List<Team> getAllTeams() throws SQLException {
        List<Team> teams = new ArrayList<>();
        String sql = "SELECT * FROM team";

        try (Connection connection = DatabaseConnectionManager.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql);
             ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Team team = new Team();
                team.setTeamId(resultSet.getInt("team_id"));
                team.setTeamName(resultSet.getString("team_name"));
                team.setLocation(resultSet.getString("location"));
                team.setOwnerName(resultSet.getString("owner_name"));
                team.setEstablishmentYear(resultSet.getInt("establishment_year"));
                teams.add(team);
            }
        }

        return teams;
    }
}