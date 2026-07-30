package com.vishnu.campus_lost_found.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "lost_items")
public class LostItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;

    private String category;

    private String description;

    private String location;

    private String dateLost;

    private String imageUrl;

    private String status;

    private String reportedBy;
}