package com.vishnu.campus_lost_found.repository;

import com.vishnu.campus_lost_found.entity.Claim;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
}