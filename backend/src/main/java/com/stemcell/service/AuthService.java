package com.stemcell.service;

import com.stemcell.dto.LoginRequest;
import com.stemcell.dto.RegisterRequest;
import com.stemcell.model.User;
import com.stemcell.repository.UserRepository;
import com.stemcell.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import jakarta.mail.MessagingException;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final EmailService emailService;
    private final Map<String, String> otpStore = new HashMap<>();

    public ResponseEntity<?> register(RegisterRequest request) {
        User existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);
        
        if (existingUser != null && existingUser.isVerified()) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Email already exists"));
        }

        if (existingUser != null && !existingUser.isVerified()) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Email already exists, please verify your account."));
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        try {
            user.setRole(User.Role.valueOf(request.getRole()));
            
            // Set role-specific fields
            if (user.getRole() == User.Role.DOCTOR) {
                user.setSpecialty(request.getSpecialty());
            } else if (user.getRole() == User.Role.COURIER) {
                user.setVehicleInfo(request.getVehicleInfo());
            } else if (user.getRole() == User.Role.TECHNICIAN) {
                user.setLicenseNumber(request.getLicenseNumber());
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Invalid role specified"));
        }
        user.setVerified(false);

        userRepository.save(user);
        String otp = generateOtp();
        otpStore.put(request.getEmail(), otp);
        
        try {
            emailService.sendOtpEmail(request.getEmail(), otp);
        } catch (MessagingException e) {
            return ResponseEntity.internalServerError()
                .body("Failed to send OTP email. Please try again.");
        }
        
        return ResponseEntity.ok()
            .body(Map.of("message", "Registration successful. Please verify your email."));
    }

    public ResponseEntity<?> login(LoginRequest request) {
        try {
            log.info("Login attempt for email: {}", request.getEmail());
            
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.error("User not found: {}", request.getEmail());
                    return new RuntimeException("User not found");
                });

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                log.error("Invalid password for user: {}", request.getEmail());
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid credentials"));
            }

            if (!user.isVerified()) {
                log.error("User not verified: {}", request.getEmail());
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Please verify your email first"));
            }

            String token = jwtTokenUtil.generateToken(user.getEmail(), user.getRole());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);

            log.info("Login successful for user: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Login failed for user: {}", request.getEmail(), e);
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    public ResponseEntity<?> verifyOtp(String email, String otp) {
        String storedOtp = otpStore.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
            user.setVerified(true);
            userRepository.save(user);
            otpStore.remove(email);
            return ResponseEntity.ok()
                .body(Map.of("message", "Email verified successfully"));
        }
        return ResponseEntity.badRequest()
            .body(Map.of("message", "Invalid OTP"));
    }

    public ResponseEntity<?> resendOtp(String email) {
        if (!userRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Email not found"));
        }
        String otp = generateOtp();
        otpStore.put(email, otp);
        try {
            emailService.sendOtpEmail(email, otp);
        } catch (MessagingException e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("message", "Failed to send OTP email. Please try again."));
        }
        return ResponseEntity.ok()
            .body(Map.of("message", "OTP sent successfully"));
    }

    private String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
}
