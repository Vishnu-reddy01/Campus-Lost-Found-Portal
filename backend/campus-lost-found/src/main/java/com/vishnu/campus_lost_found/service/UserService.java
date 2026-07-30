package com.vishnu.campus_lost_found.service;

import com.vishnu.campus_lost_found.dto.LoginRequest;
import com.vishnu.campus_lost_found.entity.User;
import com.vishnu.campus_lost_found.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user){

        if(userRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("Email already registered");
        }

        return userRepository.save(user);
    }

    public User login(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }
}