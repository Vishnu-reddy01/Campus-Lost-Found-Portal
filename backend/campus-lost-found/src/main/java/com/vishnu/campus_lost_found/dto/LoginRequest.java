package com.vishnu.campus_lost_found.dto;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;

}