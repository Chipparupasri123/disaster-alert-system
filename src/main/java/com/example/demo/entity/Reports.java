package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "reports")
public class Reports {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String zone;

    private Long disasterCount;

    private Long acknowledgedCount;

    private Long ignoredCount;

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public Long getDisasterCount() {
        return disasterCount;
    }

    public void setDisasterCount(Long disasterCount) {
        this.disasterCount = disasterCount;
    }

    public Long getAcknowledgedCount() {
        return acknowledgedCount;
    }

    public void setAcknowledgedCount(Long acknowledgedCount) {
        this.acknowledgedCount = acknowledgedCount;
    }

    public Long getIgnoredCount() {
        return ignoredCount;
    }

    public void setIgnoredCount(Long ignoredCount) {
        this.ignoredCount = ignoredCount;
    }
}