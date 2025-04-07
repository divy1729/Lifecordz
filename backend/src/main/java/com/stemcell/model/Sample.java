package com.stemcell.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "samples")
public class Sample {
    @Id
    private String id;
    private String userId;
    private String status;
    private LocalDateTime collectionDate;
    private String collectionAddress;
    private String trackingId;
    private String sampleType;
    private LocalDateTime storageDate;
} 