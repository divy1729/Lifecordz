package com.stemcell.controller;

import com.stemcell.model.User;
import com.stemcell.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PutMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        return userService.updateUser(id, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if (userService.deleteUser(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // New endpoint to update birth info
    @PutMapping("/{id}/birth-info")
    @PreAuthorize("#id == principal.id or hasRole('DONOR') or hasRole('ADMIN')")
    public ResponseEntity<User> updateBirthInfo(@PathVariable String id, @RequestBody Map<String, Object> birthInfo) {
        System.out.println("Authentication Principal: " + SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        System.out.println("Authentication Authorities: " + SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        System.out.println("Path Variable ID: " + id);
        return userService.updateBirthInfo(id, birthInfo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // New endpoint to update address
    @PutMapping("/{id}/address")
    @PreAuthorize("#id == principal.id or hasRole('DONOR') or hasRole('ADMIN')")
    public ResponseEntity<User> updateAddress(@PathVariable String id, @RequestBody Map<String, Object> address) {
        return userService.updateAddress(id, address)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // New endpoint to update user role
    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUserRole(@PathVariable String id, @RequestBody Map<String, String> roleMap) {
        String newRole = roleMap.get("role");
        return userService.updateUserRole(id, newRole)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
