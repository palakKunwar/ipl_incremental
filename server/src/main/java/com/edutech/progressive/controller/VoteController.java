package com.edutech.progressive.controller;

import com.edutech.progressive.entity.Vote;
import com.edutech.progressive.service.impl.VoteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class VoteController {

    @Autowired
    private VoteServiceImpl voteServiceImpl;

    @GetMapping("/vote")
    public ResponseEntity<List<Vote>> getAllVotes() {
        try {
            return new ResponseEntity<>(voteServiceImpl.getAllVotes(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/vote")
    public ResponseEntity<Integer> createVote(@RequestBody Vote vote) {
        try {
            return new ResponseEntity<>(voteServiceImpl.createVote(vote), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Each key (k) represents a category (categories - “Team”, “Batsman”, “Bowler”, “All-rounder” and “Wicketkeeper”)
    // and each value (v) represents the total number of votes for that category.
    @GetMapping("/vote/count")
    public ResponseEntity<Map<String, Long>> getVotesCountOfAllCategories() {
        try {
            return new ResponseEntity<>(voteServiceImpl.getVotesCountOfAllCategories(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}