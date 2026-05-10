package com.edutech.progressive.controller;
 
import com.edutech.progressive.entity.Vote;
 
import com.edutech.progressive.service.impl.VoteServiceImpl;
 
import org.springframework.beans.factory.annotation.Autowired;
 
import org.springframework.http.HttpStatus;
 
import org.springframework.http.ResponseEntity;
 
import org.springframework.web.bind.annotation.GetMapping;
 
import org.springframework.web.bind.annotation.PostMapping;
 
import org.springframework.web.bind.annotation.RequestBody;
 
import org.springframework.web.bind.annotation.RequestMapping;
 
import org.springframework.web.bind.annotation.RestController;
 
import java.util.List;
 
import java.util.Map;
 
@RestController
 
@RequestMapping("/vote")
 
public class VoteController {
 
    @Autowired
 
    VoteServiceImpl voteService;
 
    @GetMapping
 
    public ResponseEntity<List<Vote>> getAllVotes() {
 
        List<Vote> voteList = voteService.getAllVotes();
 
        return ResponseEntity.status(200).body(voteList);
 
    }
 
    @PostMapping
public ResponseEntity<?> createVote(@RequestBody Vote vote) {
    try {
        int id = voteService.createVote(vote);
        return ResponseEntity.status(201).body(id);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

 
    @GetMapping("/count")
 
    public ResponseEntity<Map<String, Long>> getVotesCountOfAllCategories() {
 
        Map<String, Long> countMap = voteService.getVotesCountOfAllCategories();
 
        return new ResponseEntity<>(countMap, HttpStatus.OK);
 
    }
 
}

 
 