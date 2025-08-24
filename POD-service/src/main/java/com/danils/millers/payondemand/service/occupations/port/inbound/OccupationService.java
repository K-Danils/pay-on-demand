package com.danils.millers.payondemand.service.occupations.port.inbound;

import com.danils.millers.payondemand.service.occupations.model.Occupation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OccupationService {
    List<Occupation> getAll();
    Occupation getById(UUID id);
    Occupation save(Occupation occupation);
    Occupation update(Occupation occupation);
    void delete(UUID id);
}
