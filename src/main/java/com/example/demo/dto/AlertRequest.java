package com.example.demo.dto;

public class AlertRequest {
    private String title;
    private String description;
    private String location;
    private String zone;  

    // Getters & Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getZone() { return zone; }       // 🔥 Added
    public void setZone(String zone) { this.zone = zone; }
}