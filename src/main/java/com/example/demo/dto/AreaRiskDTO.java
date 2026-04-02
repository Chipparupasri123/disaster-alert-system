package com.example.demo.dto;

public class AreaRiskDTO {
    private String zone;
    private long count;

    public AreaRiskDTO(String zone, long count) {
        this.zone = zone;
        this.count = count;
    }

    public String getZone() {
        return zone;
    }

    public long getCount() {
        return count;
    }
}