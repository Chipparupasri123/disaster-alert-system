package com.example.demo.controller;

import com.example.demo.entity.RescueTask;
import com.example.demo.service.RescueTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rescue")
@CrossOrigin("*")
public class RescueTaskController {

    @Autowired
    private RescueTaskService service;

    @PutMapping("/{taskId}/accept")
    public RescueTask acceptTask(@PathVariable Long taskId) {
        return service.acceptTask(taskId);
    }

    @PutMapping("/{taskId}/complete")
    public RescueTask completeTask(@PathVariable Long taskId) {
        return service.completeTask(taskId);
    }

    @GetMapping("/assigned")
    public List<RescueTask> assignedTasks() {
        return service.getAssignedTasks();
    }

    @GetMapping("/all")
    public List<RescueTask> allTasks() {
        return service.getAllTasks();
    }

    @PostMapping("/assign")
    public RescueTask assign(@RequestBody RescueTask task) {
        return service.assignTask(task);
    }
}