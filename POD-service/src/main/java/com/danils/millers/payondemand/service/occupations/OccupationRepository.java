package com.danils.millers.payondemand.service.occupations;

import com.danils.millers.payondemand.service.occupations.model.Occupation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;


public interface OccupationRepository extends JpaRepository<Occupation, UUID> {
}
