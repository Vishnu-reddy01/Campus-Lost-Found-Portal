package com.vishnu.campus_lost_found.repository;

import com.vishnu.campus_lost_found.entity.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LostItemRepository extends JpaRepository<LostItem, Long> {

}