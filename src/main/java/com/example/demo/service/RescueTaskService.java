package com.example.demo.service;

import com.example.demo.entity.RescueTask;
import com.example.demo.repository.RescueTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RescueTaskService {

    @Autowired
    private RescueTaskRepository taskRepo;

    public RescueTask assignTask(RescueTask task) {
        task.setStatus("ASSIGNED");
        return taskRepo.save(task);
    }

    public List<RescueTask> getAllTasks() {
        return taskRepo.findAll();
    }

    public List<RescueTask> getAssignedTasks() {
    return taskRepo.findByStatusIn(List.of("ASSIGNED", "ACCEPTED"));
    }


    public RescueTask acceptTask(Long taskId) {
        RescueTask task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus("ACCEPTED");
        return taskRepo.save(task);
    }

    public RescueTask completeTask(Long taskId) {
        RescueTask task = taskRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus("COMPLETED");
        return taskRepo.save(task);
    }
}