package com.example.demo.controller;

import com.example.demo.service.ReportsService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportsController {

    private final ReportsService reportsService;

    public ReportsController(ReportsService reportsService) {
        this.reportsService = reportsService;
    }

    @GetMapping("/zone-risk")
    public List<Map<String, Object>> getZoneRisk() {
        return reportsService.getZoneWiseDisasterCount();
    }

    @GetMapping("/engagement")
    public Map<String, Long> getEngagement() {
        return reportsService.getAlertEngagement();
    }
}