package com.stemcell.service;

import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    // Placeholder methods for doctor functionalities

    public String getAssignedPatients() {
        return "List of assigned patients and donors";
    }

    public String getStemCellReports() {
        return "Stem cell reports data";
    }

    public String approveSample(String sampleId) {
        return "Sample " + sampleId + " approved";
    }

    public String requestCourierPickup(String requestId) {
        return "Courier pickup requested for " + requestId;
    }
}
