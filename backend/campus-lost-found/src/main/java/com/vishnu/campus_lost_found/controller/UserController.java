package com.vishnu.campus_lost_found.controller;

import com.vishnu.campus_lost_found.dto.LoginRequest;
import com.vishnu.campus_lost_found.entity.User;
import com.vishnu.campus_lost_found.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request){
        return userService.login(request);
    }
}