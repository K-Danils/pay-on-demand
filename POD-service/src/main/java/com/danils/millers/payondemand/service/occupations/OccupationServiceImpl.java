package com.danils.millers.payondemand.service.occupations;

import com.danils.millers.payondemand.exceptions.ResourceNotFound;
import com.danils.millers.payondemand.service.occupations.model.Occupation;
import com.danils.millers.payondemand.service.occupations.port.inbound.OccupationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OccupationServiceImpl implements OccupationService {
    private final OccupationRepository occupationRepository;

    @Override
    public List<Occupation> getAll() {
        return occupationRepository.findAll();
    }

    @Override
    public Occupation getById(UUID id) {
        return occupationRepository.findById(id).orElseThrow(
                () -> new ResourceNotFound("Occupation", "id", id.toString())
        );
    }

    @Override
    public Occupation save(Occupation occupation) {
        return occupationRepository.save(occupation);
    }

    @Override
    public Occupation update(Occupation occupation) {
        return occupationRepository.save(occupation);
    }

    @Override
    public void delete(UUID id) {
        occupationRepository.deleteById(id);
    }
}
