package com.danils.millers.payondemand.service.users;

import com.danils.millers.payondemand.service.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
