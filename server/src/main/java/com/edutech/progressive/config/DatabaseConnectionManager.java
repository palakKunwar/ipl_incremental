package com.edutech.progressive.config;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DatabaseConnectionManager {

    private static Properties properties = new Properties();

    static {
        loadProperties();
    }

    private static void loadProperties() {
        try (InputStream input = DatabaseConnectionManager.class
                .getClassLoader()
                .getResourceAsStream("application.properties")) {

            if (input == null) {
                throw new RuntimeException("Unable to find application.properties file in the classpath.");
            }
            properties.load(input);

        } catch (IOException ex) {
            throw new RuntimeException("Error occurred while reading application.properties file.", ex);
        }
    }

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(
                    properties.getProperty("spring.datasource.url"),
                    properties.getProperty("spring.datasource.username"),
                    properties.getProperty("spring.datasource.password"));
        } catch (SQLException e) {
            throw new RuntimeException("Failed to create a database connection.", e);
        }
    }
}

/* -- Create User Table
 CREATE TABLE user (
 user_id INT AUTO_INCREMENT PRIMARY KEY,
 full_name VARCHAR(255) NOT NULL,
 username VARCHAR(50) NOT NULL,
 password VARCHAR(255) NOT NULL,
 email VARCHAR(100) NOT NULL,
 role VARCHAR(100) NOT NULL
 );

 -- Create Team Table
 CREATE TABLE team (
 team_id INT PRIMARY KEY AUTO_INCREMENT,
 team_name VARCHAR(100) NOT NULL,
 location VARCHAR(100),
 owner_name VARCHAR(100),
 establishment_year INT
 );

 -- Create Cricketer Table
 CREATE TABLE cricketer (
 cricketer_id INT PRIMARY KEY AUTO_INCREMENT,
 team_id INT,
 cricketer_name VARCHAR(100) NOT NULL,
 age INT,
 nationality VARCHAR(100),
 experience INT,
 role VARCHAR(50),
 total_runs INT,
 total_wickets INT
 );

 CREATE TABLE matches (
 match_id INT PRIMARY KEY AUTO_INCREMENT,
 first_team_id INT NOT NULL,
 second_team_id INT NOT NULL,
 match_date DATE NOT NULL,
 venue VARCHAR(100),
 result VARCHAR(100),
 status VARCHAR(100),
 winner_team_id INT
 );

 CREATE TABLE vote (
    vote_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    cricketer_id INT,
    team_id INT
);

CREATE TABLE ticket_booking (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    match_id INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    number_of_tickets INT NOT NULL
);


*/