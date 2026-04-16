package com.edutech.progressive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.edutech.progressive.entity.Team;
import com.edutech.progressive.service.impl.TeamServiceImplJpa;

@SpringBootApplication

public class IplApplication {
    public static void main(String[] args) {
        // SpringApplication.run(IplApplication.class, args);
        // System.out.println("Welcome to Ipl Progressive Project!");
        
        ConfigurableApplicationContext context = SpringApplication.run(IplApplication.class, args);

        TeamServiceImplJpa service = context.getBean(TeamServiceImplJpa.class);

        Team team = new Team();
        team.setTeamName("India");

        try {
            service.addTeam(team);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    }