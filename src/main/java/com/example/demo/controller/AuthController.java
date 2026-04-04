import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User req) {

        String result = userService.login(req.getEmail(), req.getPassword());

        if (!"Login successful".equals(result)) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", result);
            return ResponseEntity.status(401).body(error);
        }

        User user = userService.getUserByEmail(req.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("message", result);
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }
}