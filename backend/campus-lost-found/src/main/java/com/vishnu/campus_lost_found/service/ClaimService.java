package com.vishnu.campus_lost_found.service;

import com.vishnu.campus_lost_found.entity.Claim;
import com.vishnu.campus_lost_found.entity.LostItem;
import com.vishnu.campus_lost_found.repository.ClaimRepository;
import com.vishnu.campus_lost_found.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private LostItemRepository lostItemRepository;

    public Claim saveClaim(Long lostItemId, Claim claim) {

        LostItem lostItem = lostItemRepository.findById(lostItemId)
                .orElseThrow(() -> new RuntimeException("Lost Item Not Found"));

        claim.setLostItem(lostItem);
        claim.setStatus("PENDING");

        return claimRepository.save(claim);
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }
    public Claim approveClaim(Long id) {

        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        claim.setStatus("APPROVED");

        // Mark the lost item as found
        LostItem lostItem = claim.getLostItem();
        lostItem.setStatus("FOUND");

        lostItemRepository.save(lostItem);

        return claimRepository.save(claim);
    }

    public Claim rejectClaim(Long id){

        Claim claim = claimRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Claim Not Found"));

        claim.setStatus("REJECTED");

        return claimRepository.save(claim);
    }
}