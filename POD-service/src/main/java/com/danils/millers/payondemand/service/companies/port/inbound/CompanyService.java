package com.danils.millers.payondemand.service.companies.port.inbound;

import com.danils.millers.payondemand.service.companies.model.Company;

import java.util.List;
import java.util.UUID;

public interface CompanyService {

    List<Company> getAll();
    Company getById(UUID id);
    Company save(Company company);
    Company update(Company company);
    void delete(UUID id);
}
