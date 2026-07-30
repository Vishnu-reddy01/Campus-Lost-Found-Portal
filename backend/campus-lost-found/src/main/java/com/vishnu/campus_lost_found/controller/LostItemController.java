package com.vishnu.campus_lost_found.controller;

import com.vishnu.campus_lost_found.entity.LostItem;
import com.vishnu.campus_lost_found.service.LostItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lost-items")
@CrossOrigin("*")
public class LostItemController {

    @Autowired
    private LostItemService lostItemService;

    // Report Lost Item
    @PostMapping
    public LostItem reportLostItem(@RequestBody LostItem item) {
        return lostItemService.reportLostItem(item);
    }

    // Get All Lost Items
    @GetMapping
    public List<LostItem> getAllLostItems() {
        return lostItemService.getAllLostItems();
    }

    // Get Lost Item By ID
    @GetMapping("/{id}")
    public LostItem getLostItemById(@PathVariable Long id) {
        return lostItemService.getLostItemById(id);
    }

    // Delete Lost Item
    @DeleteMapping("/{id}")
    public String deleteLostItem(@PathVariable Long id) {
        lostItemService.deleteLostItem(id);
        return "Lost Item Deleted Successfully";
    }
}