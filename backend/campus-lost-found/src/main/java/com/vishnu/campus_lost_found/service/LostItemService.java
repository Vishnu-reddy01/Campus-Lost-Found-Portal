package com.vishnu.campus_lost_found.service;

import com.vishnu.campus_lost_found.entity.LostItem;
import com.vishnu.campus_lost_found.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LostItemService {

    @Autowired
    private LostItemRepository lostItemRepository;

    // Report Lost Item
    public LostItem reportLostItem(LostItem item){
        return lostItemRepository.save(item);
    }

    // Get All Lost Items
    public List<LostItem> getAllLostItems(){
        return lostItemRepository.findAll();
    }

    // Get Lost Item By ID
    public LostItem getLostItemById(Long id){
        return lostItemRepository.findById(id).orElse(null);
    }

    // Delete Lost Item
    public void deleteLostItem(Long id){
        lostItemRepository.deleteById(id);
    }

}