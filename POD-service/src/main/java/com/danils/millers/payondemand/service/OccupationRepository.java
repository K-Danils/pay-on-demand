package com.danils.millers.payondemand.service;

import com.danils.millers.payondemand.entities.Occupation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OccupationRepository extends JpaRepository<Occupation, String> {
}
