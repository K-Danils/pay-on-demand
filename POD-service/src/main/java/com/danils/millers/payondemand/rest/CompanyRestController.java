package com.danils.millers.payondemand.rest;

import com.danils.millers.payondemand.entities.Company;
import com.danils.millers.payondemand.service.CompanyRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CompanyRestController {
    private CompanyRepository companyRepository;

    public CompanyRestController(CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
    }

    @GetMapping("/companies")
    public List<Company> getCompanies(){
        return companyRepository.findAll();
    }

    @GetMapping("/companies/{id}")
    public Company getCompany(@PathVariable String id){
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
    public void deleteCompany(@PathVariable String id) {
        if (!companyRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found");
        }

        companyRepository.deleteById(id);
    }
}
