package com.stemcell.controller;

import com.stemcell.repository.UserRepository;
import com.stemcell.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AnalyticsController {

    private final UserRepository userRepository;
    private final OrderService orderService;

    @GetMapping("/api/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        long totalUsers = userRepository.count();
        long totalOrders = orderService.getOrderCount();
        int totalRevenue = orderService.getTotalRevenue();

        analytics.put("totalUsers", totalUsers);
        analytics.put("totalOrders", totalOrders);
        analytics.put("totalRevenue", totalRevenue);

        return ResponseEntity.ok(analytics);
    }
}
