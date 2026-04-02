package com.example.demo.repository;

import com.example.demo.entity.HelpRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HelpRepository extends JpaRepository<HelpRequest, Long> {
    List<HelpRequest> findByStatus(String status);
}