package com.example.demo.controller;

import com.example.demo.dto.AlertRequest;
import com.example.demo.entity.Alert;
import com.example.demo.service.AlertService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    // Broadcast alert (only after admin login validated in frontend)
    @PostMapping("/broadcast")
    public Alert broadcastAlert(@RequestBody AlertRequest request) {
        return alertService.createAlert(request);
    }

    // Citizen/Responder can view alerts
    @GetMapping
    public List<Alert> getAlerts() {
        return alertService.getAllAlerts();
    }
}