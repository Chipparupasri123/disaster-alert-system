package com.example.demo.dto;

public class AlertEngagementDTO {
    private long acknowledged;
    private long ignored;

    public AlertEngagementDTO(long acknowledged, long ignored) {
        this.acknowledged = acknowledged;
        this.ignored = ignored;
    }

    public long getAcknowledged() {
        return acknowledged;
    }

    public long getIgnored() {
        return ignored;
    }
}