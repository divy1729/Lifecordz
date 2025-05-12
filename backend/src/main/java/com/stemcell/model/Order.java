package com.stemcell.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String userId;
    private int amount;
    private String status; // e.g. "pending", "paid"
    private Map<String, Object> paymentDetails;

    private LocalDateTime date;

    private String userName;
    private String userEmail;

    private Map<String, Object> address;
    private Map<String, Object> birthInfo;
}
