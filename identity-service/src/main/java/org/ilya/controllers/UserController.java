package org.ilya.controllers;

import lombok.RequiredArgsConstructor;
import org.ilya.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/getall")
    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
}
