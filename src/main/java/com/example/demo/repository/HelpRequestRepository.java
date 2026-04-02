package com.example.demo.repository;

import com.example.demo.entity.HelpRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HelpRequestRepository extends JpaRepository<HelpRequest, Long> {

    @Query("SELECT COUNT(h) FROM HelpRequest h WHERE h.status = 'ACKNOWLEDGED'")
    long countAcknowledged();

    @Query("SELECT COUNT(h) FROM HelpRequest h WHERE h.status = 'PENDING'")
    long countPending();
}