package com.example.demo.repository;

import com.example.demo.entity.RescueTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RescueTaskRepository extends JpaRepository<RescueTask, Long> {

    List<RescueTask> findByStatusIn(List<String> statuses);

    List<RescueTask> findAllByOrderByIdDesc();
}