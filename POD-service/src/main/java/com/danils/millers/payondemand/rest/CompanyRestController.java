package com.danils.millers.payondemand.rest;

import com.danils.millers.payondemand.entities.Company;
import com.danils.millers.payondemand.service.CompanyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class CompanyRestController {
    private CompanyRepository companyRepository;

    public CompanyRestController(CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
    }

    @GetMapping("/companies")
    public Page<Company> getCompanies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name,asc") String[] sort){

        Sort sortObj = Sort.by(Sort.Order.by(sort[0]).with(Sort.Direction.fromString(sort[1])));

        Pageable pageable = PageRequest.of(page, size, sortObj);

        return companyRepository.findAll(pageable);
    }

    @GetMapping("/companies/{id}")
    public Company getCompany(@PathVariable UUID id){
        return companyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found"));
    }

    @PostMapping("/companies")
    public Company addCompany(@RequestBody Company company) {
        company.setId(null);
        return companyRepository.save(company);
    }

    @PutMapping("/companies")
    public Company updateCompany(@RequestBody Company company) {
        Company foundCompany = companyRepository.findById(company.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found"));

        return companyRepository.save(company);
    }

    @DeleteMapping("/companies/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompany(@PathVariable UUID id) {
        if (!companyRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found");
        }

        companyRepository.deleteById(id);
    }
}
