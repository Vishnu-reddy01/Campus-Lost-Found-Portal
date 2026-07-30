package com.vishnu.campus_lost_found.controller;

import com.vishnu.campus_lost_found.entity.Claim;
import com.vishnu.campus_lost_found.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin("*")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @PostMapping("/{lostItemId}")
    public Claim createClaim(
            @PathVariable Long lostItemId,
            @RequestBody Claim claim) {

        return claimService.saveClaim(lostItemId, claim);
    }

    @GetMapping
    public List<Claim> getAllClaims() {
        return claimService.getAllClaims();
    }
    @PutMapping("/{id}/approve")
    public Claim approveClaim(@PathVariable Long id){

        return claimService.approveClaim(id);

    }

    @PutMapping("/{id}/reject")
    public Claim rejectClaim(@PathVariable Long id){

        return claimService.rejectClaim(id);

    }

}