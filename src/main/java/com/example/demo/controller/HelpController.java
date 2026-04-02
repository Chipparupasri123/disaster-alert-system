package com.example.demo.controller;

import com.example.demo.entity.HelpRequest;
import com.example.demo.repository.HelpRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/help")
@CrossOrigin("*")
public class HelpController {

    private final HelpRepository repo;

    public HelpController(HelpRepository repo) {
        this.repo = repo;
    }

    // ✅ CITIZEN: Send help request
    @PostMapping
    public HelpRequest create(@RequestBody HelpRequest req) {
        req.setStatus("PENDING");
        return repo.save(req);
    }

    // ✅ RESPONDER: View pending requests
    @GetMapping("/pending")
    public List<HelpRequest> pending() {
        return repo.findByStatus("PENDING");
    }

    // ✅ RESPONDER: View acknowledged requests
    @GetMapping("/acknowledged")
    public List<HelpRequest> acknowledged() {
        return repo.findByStatus("ACKNOWLEDGED");
    }

    // ✅ RESPONDER: Acknowledge a request
    @PutMapping("/{id}/acknowledge")
    public HelpRequest acknowledge(@PathVariable Long id) {
        HelpRequest req = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus("ACKNOWLEDGED");
        return repo.save(req);
    }
}