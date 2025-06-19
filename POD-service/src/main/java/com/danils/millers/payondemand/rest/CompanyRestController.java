package com.danils.millers.payondemand.rest;

import com.danils.millers.payondemand.entities.Company;
import com.danils.millers.payondemand.service.CompanyService;
import com.danils.millers.payondemand.service.Services;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CompanyRestController {
    private Services<Company> service;
    private ObjectMapper objectMapper;

    @Autowired
    CompanyRestController(CompanyService service, ObjectMapper objectMapper){
        this.service = service;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/companies")
    public List<Company> getCompanies(){
        return service.findAll();
    }

    @GetMapping("/companies/{id}")
    public Company getCompany(@PathVariable String id){
        Company company = service.findById(id);

        if(company == null){
            throw  new RuntimeException("Company not found by id " + id);
        }

        return company;
    }

    @PostMapping("/companies")
    public Company addCompany(@RequestBody Company company) {
        company.setId("");
        return service.save(company);
    }

    @PutMapping("/companies")
    public Company updateCompany(@RequestBody Company company) {
        return service.save(company);
    }

    @PatchMapping("/companies/{id}")
    public Company patchCompany(@PathVariable String id, @RequestBody Map<String, Object> patchPayload) {
        Company company = service.findById(id);

        // throw exception if null
        if (company == null) {
            throw new RuntimeException("Company not found by id- " + id);
        }

        // throw exception if request body contains "id" key
        if (patchPayload.containsKey("id")) {
            throw new RuntimeException("Company id not allowed in request body - " + id);
        }

        Company patchedCompany = apply(patchPayload, company);

        return service.save(patchedCompany);
    }

    private Company apply(Map<String, Object> patchPayload, Company company) {
        ObjectNode node = objectMapper.convertValue(company, ObjectNode.class);
        ObjectNode patchNode = objectMapper.convertValue(patchPayload, ObjectNode.class);

        node.setAll(patchNode);

        return objectMapper.convertValue(node, Company.class);
    }

    @DeleteMapping("/companies/{id}")
    public String deleteCompany(@PathVariable String id) {
        Company company = service.findById(id);

        if (company == null) {
            throw new RuntimeException("Company id not found - " + id);
        }

        service.deleteById(id);

        return "Deleted company id - " + id;
    }
}
