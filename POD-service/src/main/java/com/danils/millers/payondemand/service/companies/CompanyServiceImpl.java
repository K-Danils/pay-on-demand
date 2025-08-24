package com.danils.millers.payondemand.service.companies;

import com.danils.millers.payondemand.exceptions.GlobalExceptionHandler;
import com.danils.millers.payondemand.exceptions.ResourceNotFound;
import com.danils.millers.payondemand.service.companies.model.Company;
import com.danils.millers.payondemand.service.companies.port.inbound.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;

    @Override
    public List<Company> getAll() {
        return companyRepository.findAll();
    }

    @Override
    public Company getById(UUID id) {
        return companyRepository.findById(id).orElseThrow(
                () -> new ResourceNotFound("Company", "id", id.toString())
        );
    }

    @Override
    public Company save(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public Company update(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public void delete(UUID id) {
        companyRepository.deleteById(id);
    }
}
