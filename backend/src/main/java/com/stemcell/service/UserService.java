package com.stemcell.service;

import com.stemcell.model.User;
import com.stemcell.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> updateUser(String id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            user.setRole(updatedUser.getRole());
            user.setVerified(updatedUser.isVerified());
            user.setSpecialty(updatedUser.getSpecialty());
            user.setVehicleInfo(updatedUser.getVehicleInfo());
            user.setLicenseNumber(updatedUser.getLicenseNumber());
            return userRepository.save(user);
        });
    }

    public boolean deleteUser(String id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return true;
        }).orElse(false);
    }

    public Optional<User> updateBirthInfo(String id, Map<String, Object> birthInfo) {
        return userRepository.findById(id).map(user -> {
            user.setBirthInfo(birthInfo);
            return userRepository.save(user);
        });
    }

    public Optional<User> updateAddress(String id, Map<String, Object> address) {
        return userRepository.findById(id).map(user -> {
            user.setAddress(address);
            return userRepository.save(user);
        });
    }

    public Optional<User> updateUserRole(String id, String newRole) {
        return userRepository.findById(id).map(user -> {
            try {
                user.setRole(User.Role.valueOf(newRole));
            } catch (IllegalArgumentException e) {
                // Handle invalid role gracefully, e.g., log and return empty optional
                System.err.println("Invalid role: " + newRole);
                return null;
            }
            return userRepository.save(user);
        });
    }
}
