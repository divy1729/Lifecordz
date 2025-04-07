package com.stemcell.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Document(collection = "users")
public class User {
    public enum Role {
        ADMIN, DOCTOR, TECHNICIAN, DONOR, SUPPORT, COURIER
    }

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;
    private String phone;
    private Role role;
    private boolean verified;
    
    // Role-specific fields
    private String specialty; // For doctors
    private String vehicleInfo; // For couriers
    private String licenseNumber; // For technicians
}
