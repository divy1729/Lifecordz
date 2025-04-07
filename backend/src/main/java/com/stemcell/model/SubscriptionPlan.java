package com.stemcell.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "subscription_plans")
public class SubscriptionPlan {
    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private String duration;
    private String[] features;
} 