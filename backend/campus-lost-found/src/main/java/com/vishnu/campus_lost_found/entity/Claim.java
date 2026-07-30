package com.vishnu.campus_lost_found.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String claimantName;

    private String claimantEmail;

    private String message;

    private String status;

    @ManyToOne
    private LostItem lostItem;
}