package com.danils.millers.payondemand.service;

import com.danils.millers.payondemand.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
