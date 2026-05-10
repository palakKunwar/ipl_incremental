package com.edutech.progressive.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Vote;
import com.edutech.progressive.repository.VoteRepository;
import com.edutech.progressive.service.VoteService;
@Service("voteServiceImpl")
public class VoteServiceImpl implements VoteService {
    @Autowired
    private VoteRepository voteRepository;
    @Override
    public List<Vote> getAllVotes() {
        return voteRepository.findAll();
    }

   @Override
public int createVote(Vote vote) {

    // 🔴 Check if user already voted in this category
    Vote existingVote = voteRepository
            .findByEmailAndCategory(vote.getEmail(), vote.getCategory())
            .orElse(null);

    if (existingVote != null) {
        throw new RuntimeException("You have already voted in this category");
    }

    // ✅ Save if not voted yet
    return voteRepository.save(vote).getVoteId();
}

    @Override
    public Map<String, Long> getVotesCountOfAllCategories() {
                Map<String, Long> countsMap = new HashMap<>();
        List<String> categories = List.of("Team", "Batsman", "Bowler", "All-rounder", "Wicketkeeper");
        for (String category : categories) {
            Long count = voteRepository.countByCategory(category);
            countsMap.put(category, count);
        }
        return countsMap;
    }
    }