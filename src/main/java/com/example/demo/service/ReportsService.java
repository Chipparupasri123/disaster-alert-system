package com.example.demo.service;

import com.example.demo.repository.ReportsRepository;
import com.example.demo.repository.HelpRequestRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReportsService {

    private final ReportsRepository reportsRepository;
    private final HelpRequestRepository helpRequestRepository;

    public ReportsService(ReportsRepository reportsRepository,
                          HelpRequestRepository helpRequestRepository) {
        this.reportsRepository = reportsRepository;
        this.helpRequestRepository = helpRequestRepository;
    }

    // ===== Zone-wise disaster count =====
    public List<Map<String, Object>> getZoneWiseDisasterCount() {
        List<Object[]> results = reportsRepository.countDisastersByZone();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("zone", row[0]);
            map.put("count", row[1]);
            response.add(map);
        }
        return response;
    }

    // ===== Alert engagement (ACK / IGNORE) =====
    public Map<String, Long> getAlertEngagement() {
        long acknowledged = helpRequestRepository.countAcknowledged();
        long pending = helpRequestRepository.countPending();

        Map<String, Long> map = new HashMap<>();
        map.put("acknowledged", acknowledged);
        map.put("pending", pending);

        return map;
    }
}