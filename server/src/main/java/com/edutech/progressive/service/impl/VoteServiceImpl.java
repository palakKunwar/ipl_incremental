package com.edutech.progressive.service.impl;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Vote;
import com.edutech.progressive.repository.VoteRepository;

@Service
public class VoteServiceImpl {

    @Autowired
    private VoteRepository voteRepository;

    public VoteServiceImpl() {
    }

    public VoteServiceImpl(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

    public Integer createVote(Vote vote) {
        Vote savedVote = voteRepository.save(vote);
        return savedVote.getVoteId();
    }

    public Map<String, Long> getVotesCountOfAllCategories() {
        Map<String, Long> categoryVotesCount = new LinkedHashMap<>();

        categoryVotesCount.put("Team", voteRepository.countByCategory("Team"));
        categoryVotesCount.put("Batsman", voteRepository.countByCategory("Batsman"));
        categoryVotesCount.put("Bowler", voteRepository.countByCategory("Bowler"));
        categoryVotesCount.put("All-rounder", voteRepository.countByCategory("All-rounder"));
        categoryVotesCount.put("Wicketkeeper", voteRepository.countByCategory("Wicketkeeper"));

        return categoryVotesCount;
    }
}