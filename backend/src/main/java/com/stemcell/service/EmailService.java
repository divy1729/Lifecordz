package com.stemcell.service;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @PostConstruct
    public void init() {
        log.info("EmailService initialized with sender email: {}", fromEmail);
    }

    public void sendOtpEmail(String to, String otp) throws MessagingException {
        if (to == null || otp == null) {
            log.error("Email address or OTP is null");
            throw new IllegalArgumentException("Email address and OTP are required");
        }

        log.info("Preparing to send OTP email to: {}", to);
        log.debug("Using sender email: {}", fromEmail);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Your OTP for StemCell Banking");
            helper.setText(createEmailContent(otp), true);

            log.debug("Email content prepared, attempting to send...");
            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);

        } catch (MessagingException e) {
            log.error("Failed to send email to: {}. Error: {}", to, e.getMessage());
            log.error("Detailed stack trace: ", e);
            throw new MessagingException("Failed to send OTP email: " + e.getMessage(), e);
        }
    }

    private String createEmailContent(String otp) {
        return String.format("""
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;'>
                <div style='text-align: center; padding: 20px;'>
                    <h1 style='color: #2c3e50; margin-bottom: 20px;'>StemCell Banking Verification</h1>
                    <div style='background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
                        <h2 style='color: #3498db; margin-bottom: 15px;'>Your Verification Code</h2>
                        <div style='font-size: 32px; font-weight: bold; color: #2c3e50; margin: 20px 0; letter-spacing: 2px;'>
                            %s
                        </div>
                        <p style='color: #7f8c8d; margin-bottom: 10px;'>This code will expire in 10 minutes.</p>
                        <p style='color: #95a5a6; font-size: 12px;'>If you didn't request this code, please ignore this email.</p>
                    </div>
                    <div style='margin-top: 20px; padding: 10px; border-top: 1px solid #eee;'>
                        <p style='color: #7f8c8d; font-size: 12px;'>This is an automated message, please do not reply.</p>
                    </div>
                </div>
            </div>
            """, otp);
    }
}
