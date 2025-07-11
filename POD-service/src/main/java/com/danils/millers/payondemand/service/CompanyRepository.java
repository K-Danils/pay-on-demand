package com.danils.millers.payondemand.service;

import com.danils.millers.payondemand.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID>, JpaSpecificationExecutor<Company> {
    @Query("SELECT COUNT(u) FROM User u JOIN u.companies c WHERE c.id = :companyId")
    long userCountByCompanyId(@Param("companyId") String companyId);
}
