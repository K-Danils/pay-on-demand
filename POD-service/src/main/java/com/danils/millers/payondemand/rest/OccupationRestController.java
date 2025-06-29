package com.danils.millers.payondemand.rest;

import com.danils.millers.payondemand.entities.Occupation;
import com.danils.millers.payondemand.service.CompanyRepository;
import com.danils.millers.payondemand.service.OccupationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import utils.PatchUtility;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OccupationRestController {
    private OccupationRepository occupationRepository;

    public OccupationRestController(OccupationRepository occupationRepository){
        this.occupationRepository = occupationRepository;
    }

    @GetMapping("/occupations")
    public List<Occupation> getOccupations(){
        return occupationRepository.findAll();
    }

    @GetMapping("/occupations/{id}")
    public Occupation getOccupation(@PathVariable String id){
        return occupationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Occupation not found"));
    }

    @PostMapping("/occupations")
    public Occupation addOccupation(@RequestBody Occupation occupation) {
        occupation.setId(null);
        return occupationRepository.save(occupation);
    }

    @PutMapping("/occupations")
    public Occupation updateOccupation(@RequestBody Occupation occupation) {
        Occupation foundOccupation = occupationRepository.findById(occupation.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Occupation not found"));

        return occupationRepository.save(foundOccupation);
    }

    @PatchMapping("/occupations")
    public ResponseEntity<Occupation> patchOccupation(@PathVariable String id, @RequestBody Map<String, Object> payload){
        Occupation foundOccupation = occupationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Occupation not found"));
        Occupation patchedOccupation = occupationRepository
                .save(PatchUtility.applyPatchToEntity(foundOccupation, payload, Occupation.class));

        return ResponseEntity.ok(patchedOccupation);
    }

    @DeleteMapping("/occupations/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOccupation(@PathVariable String id) {
        if (!occupationRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Occupation not found");
        }

        occupationRepository.deleteById(id);
    }
}
