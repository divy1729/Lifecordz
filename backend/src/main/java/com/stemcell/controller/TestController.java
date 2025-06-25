package com.stemcell.controller;

import com.stemcell.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/public/test")
@RequiredArgsConstructor
public class TestController {
    private final EmailService emailService;

    @GetMapping("/email")
    public ResponseEntity<?> testEmail(@RequestParam String to) {
        try {
            log.info("Attempting to send test email to: {}", to);
            emailService.sendOtpEmail(to, "123456");
            log.info("Test email sent successfully");
            return ResponseEntity.ok("Test email sent successfully");
        } catch (Exception e) {
            log.error("Failed to send test email", e);
            return ResponseEntity.internalServerError()
                .body("Failed to send test email: " + e.getMessage());
        }
    }

    @GetMapping
    public String test() {
        return "Test endpoint working!";
    }
} 