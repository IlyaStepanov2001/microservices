package org.ilya.services;

import lombok.RequiredArgsConstructor;
import org.ilya.dtos.AuthRequest;
import org.ilya.dtos.JwtResponse;
import org.ilya.dtos.UserDto;
import org.ilya.entities.User;
import org.ilya.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> signUp(@RequestBody AuthRequest authRequest) {
        if (userService.existsByUsername(authRequest.getUsername())) {
            return new ResponseEntity<>(String.format("Пользователь c именем '%s' уже существует", authRequest.getUsername()), HttpStatus.CONFLICT);
        }
        if (userService.existsByEmail(authRequest.getEmail())) {
            return new ResponseEntity<>(String.format("Пользователь c эл.почтой '%s' уже существует", authRequest.getEmail()), HttpStatus.CONFLICT);
        }

        User user = userService.save(authRequest);
        return new ResponseEntity<>(new UserDto(user.getId(), user.getUsername(), user.getEmail()), HttpStatus.CREATED);
    }

    public ResponseEntity<?> signIn(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Неверный логин или пароль", HttpStatus.UNAUTHORIZED);
        }
        UserDetails userDetails = userService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }
}
