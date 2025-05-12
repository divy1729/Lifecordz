package com.stemcell.controller;

import com.stemcell.service.SupportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
public class SupportController {

    private final SupportService supportService;

    @GetMapping("/user-queries")
    @PreAuthorize("hasRole('SUPPORT') or hasRole('ADMIN')")
    public ResponseEntity<String> viewUserQueries() {
        return ResponseEntity.ok(supportService.viewUserQueries());
    }

    @GetMapping("/manage-tickets")
    @PreAuthorize("hasRole('SUPPORT') or hasRole('ADMIN')")
    public ResponseEntity<String> manageTickets() {
        return ResponseEntity.ok(supportService.manageTickets());
    }

    @GetMapping("/chat-email-integration")
    @PreAuthorize("hasRole('SUPPORT') or hasRole('ADMIN')")
    public ResponseEntity<String> chatEmailIntegration() {
        return ResponseEntity.ok(supportService.chatEmailIntegration());
    }
}
