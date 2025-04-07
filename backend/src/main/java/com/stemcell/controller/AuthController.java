package com.stemcell.controller;

import com.stemcell.dto.LoginRequest;
import com.stemcell.dto.RegisterRequest;
import com.stemcell.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        log.info("Registration request received for email: {}", request.getEmail());
        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.info("Login request received for email: {}", request.getEmail());
        return authService.login(request);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        log.info("OTP verification request received for email: {}", email);
        return authService.verifyOtp(email, otp);
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestParam String email) {
        log.info("OTP resend request received for email: {}", email);
        return authService.resendOtp(email);
    }
} 