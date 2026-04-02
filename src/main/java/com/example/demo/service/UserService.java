package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.entity.User;

import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // SIGNUP
    public String signup(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already registered";
        }

        // Save new user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "Registration successful";
    }

    // LOGIN
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return "Invalid email or password";
        }

        if (passwordEncoder.matches(password, user.getPassword())) {
            return "Login successful";
        }

        return "Invalid email or password";
    }

public User getUserByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
}
}