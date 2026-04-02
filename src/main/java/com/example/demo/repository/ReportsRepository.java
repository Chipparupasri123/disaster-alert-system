package com.example.demo.repository;

import com.example.demo.entity.RescueTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportsRepository extends JpaRepository<RescueTask, Long> {

    @Query("SELECT r.zone, COUNT(r) FROM RescueTask r GROUP BY r.zone")
    List<Object[]> countDisastersByZone();
    @Query("SELECT COUNT(h) FROM HelpRequest h WHERE h.status = 'PENDING'")
    long countPending();

}