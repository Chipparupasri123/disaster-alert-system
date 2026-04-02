package com.example.demo.service;

import com.example.demo.dto.AlertRequest;
import com.example.demo.entity.Alert;
import com.example.demo.repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    private final AlertRepository alertRepository;

    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public Alert createAlert(AlertRequest request) {
        Alert alert = new Alert();
        alert.setTitle(request.getTitle());
        alert.setDescription(request.getDescription());
        alert.setLocation(request.getLocation());
        return alertRepository.save(alert);
    }

    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }
}
