package com.project.r2system.domain.user;

import com.project.r2system.domain.user.entities.ERole;
import com.project.r2system.domain.user.entities.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
        Optional<Role> findByName(ERole name);
}
