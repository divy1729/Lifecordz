package com.stemcell.controller;

import com.stemcell.model.SubscriptionPlan;
import com.stemcell.service.SubscriptionPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PlanController {

    private final SubscriptionPlanService subscriptionPlanService;

    @GetMapping("/api/plans")
    public ResponseEntity<List<SubscriptionPlan>> getPlans() {
        List<SubscriptionPlan> plans = subscriptionPlanService.getAllPlans();
        return ResponseEntity.ok(plans);
    }
}
