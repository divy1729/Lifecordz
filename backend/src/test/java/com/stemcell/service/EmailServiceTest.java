package com.stemcell.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

@SpringBootTest
public class EmailServiceTest {

    @Autowired
    private EmailService emailService;

    @Test
    void testSendOtpEmail() {
        assertDoesNotThrow(() -> 
            emailService.sendOtpEmail("test@example.com", "123456")
        );
    }
} 