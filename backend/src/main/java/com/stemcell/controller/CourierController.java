package com.stemcell.controller;

import com.stemcell.service.CourierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courier")
@RequiredArgsConstructor
public class CourierController {

    private final CourierService courierService;

    @GetMapping("/pickup-schedule")
    @PreAuthorize("hasRole('COURIER') or hasRole('ADMIN')")
    public ResponseEntity<String> getPickupSchedule() {
        return ResponseEntity.ok(courierService.getPickupSchedule());
    }

    @PostMapping("/mark-complete")
    @PreAuthorize("hasRole('COURIER') or hasRole('ADMIN')")
    public ResponseEntity<String> markPickupDeliveryComplete() {
        return ResponseEntity.ok(courierService.markPickupDeliveryComplete());
    }

    @GetMapping("/route-map")
    @PreAuthorize("hasRole('COURIER') or hasRole('ADMIN')")
    public ResponseEntity<String> getRouteMap() {
        return ResponseEntity.ok(courierService.getRouteMap());
    }

    @PostMapping("/notify-technicians")
    @PreAuthorize("hasRole('COURIER') or hasRole('ADMIN')")
    public ResponseEntity<String> notifyTechnicians() {
        return ResponseEntity.ok(courierService.notifyTechnicians());
    }
}
