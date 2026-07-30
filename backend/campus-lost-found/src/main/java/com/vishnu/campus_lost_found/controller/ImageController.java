package com.vishnu.campus_lost_found.controller;

import com.vishnu.campus_lost_found.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
@CrossOrigin("*")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file) {

        try {
            String fileName = imageService.uploadImage(file);
            return ResponseEntity.ok(fileName);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Upload Failed");
        }
    }
}