package com.stemcell.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class RegisterRequest {
    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;

    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$",
            message = "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character")
    private String password;

    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    private String phone;

    @NotBlank(message = "Role is required")
    private String role;
    
    // Role-specific fields
    private String specialty; // For doctors
    private String vehicleInfo; // For couriers
    private String licenseNumber; // For technicians
}
