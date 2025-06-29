package com.danils.millers.payondemand.service;

import com.danils.millers.payondemand.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, String> {
}
