package com.stemcell.controller;

import com.stemcell.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/assigned-patients")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<String> getAssignedPatients() {
        return ResponseEntity.ok(doctorService.getAssignedPatients());
    }

    @GetMapping("/stem-cell-reports")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<String> getStemCellReports() {
        return ResponseEntity.ok(doctorService.getStemCellReports());
    }

    @PostMapping("/approve-sample/{sampleId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<String> approveSample(@PathVariable String sampleId) {
        return ResponseEntity.ok(doctorService.approveSample(sampleId));
    }

    @PostMapping("/request-courier-pickup/{requestId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<String> requestCourierPickup(@PathVariable String requestId) {
        return ResponseEntity.ok(doctorService.requestCourierPickup(requestId));
    }
}
