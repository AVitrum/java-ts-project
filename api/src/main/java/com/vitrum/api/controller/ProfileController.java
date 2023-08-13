package com.vitrum.api.controller;

import com.vitrum.api.dto.UserProfileResponse;
import com.vitrum.api.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class ProfileController {

    private final AuthenticationService service;

    @GetMapping
    public ResponseEntity<UserProfileResponse> getUserProfile(HttpServletRequest request) {
        return ResponseEntity.ok(service.getUserProfile(request));
    }
}
