package com.example.demo.controller; // ⚠️ change if needed

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;

@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "*")
public class LocationController {

    @GetMapping("/search")
public ResponseEntity<?> search(@RequestParam String query) {
    try {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://nominatim.openstreetmap.org/search?format=json&q="
                + URLEncoder.encode(query, "UTF-8");

        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "MyApp/1.0 (student project)"); // 🔥 IMPORTANT

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                String.class
        );

        return ResponseEntity.ok(response.getBody());

    } catch (Exception e) {
        e.printStackTrace();  // 🔥 VERY IMPORTANT (check console)
        return ResponseEntity.ok("[]"); // return empty array instead of error
    }
}
}