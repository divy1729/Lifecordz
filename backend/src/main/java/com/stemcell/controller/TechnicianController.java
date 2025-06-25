package com.stemcell.controller;

import com.stemcell.service.TechnicianService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/technician")
@RequiredArgsConstructor
public class TechnicianController {

    private final TechnicianService technicianService;

    @GetMapping("/incoming-samples")
    @PreAuthorize("hasRole('TECHNICIAN') or hasRole('ADMIN')")
    public ResponseEntity<String> trackIncomingSamples() {
        return ResponseEntity.ok(technicianService.trackIncomingSamples());
    }

    @PostMapping("/log-test-results")
    @PreAuthorize("hasRole('TECHNICIAN') or hasRole('ADMIN')")
    public ResponseEntity<String> logTestResults() {
        return ResponseEntity.ok(technicianService.logTestResults());
    }

    @PostMapping("/update-sample-status")
    @PreAuthorize("hasRole('TECHNICIAN') or hasRole('ADMIN')")
    public ResponseEntity<String> updateSampleStatus() {
        return ResponseEntity.ok(technicianService.updateSampleStatus());
    }

    @PostMapping("/notify-doctor-admin")
    @PreAuthorize("hasRole('TECHNICIAN') or hasRole('ADMIN')")
    public ResponseEntity<String> notifyDoctorAdmin() {
        return ResponseEntity.ok(technicianService.notifyDoctorAdmin());
    }
}
