package com.project.r2system.security.auth;

import com.project.r2system.domain.user.entities.ERole;
import com.project.r2system.domain.user.entities.Role;
import com.project.r2system.domain.user.RoleRepository;
import com.project.r2system.domain.user.entities.User;
import com.project.r2system.domain.user.UserRepository;
import com.project.r2system.security.jwt.JwtUtils;
import com.project.r2system.security.payloads.JwtResponse;
import com.project.r2system.security.payloads.LoginRequest;
import com.project.r2system.security.payloads.RegisterRequest;
import com.project.r2system.security.services.UserDetailsImpl;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final RoleRepository roleRepository ;

    public JwtResponse login(@NotNull LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles",roles);
        String jwt = jwtUtils.generateJwtToken(authentication,claims);

        return new JwtResponse(jwt);
    }

    public AuthResponse register(@NotNull RegisterRequest request) {
        User user = User.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode( request.getPassword()))
            .build();   

        Set<String> strRoles = request.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "tesoreria":
                        Role modRole = roleRepository.findByName(ERole.ROLE_TESORERIA)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);

        userRepository.save(user);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        return AuthResponse.builder()
            .token(jwtUtils.generateJwtToken(authentication))
            .build();
    }
}
