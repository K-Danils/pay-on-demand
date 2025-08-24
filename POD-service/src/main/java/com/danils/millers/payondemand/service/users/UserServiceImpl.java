package com.danils.millers.payondemand.service.users;

import com.danils.millers.payondemand.exceptions.ResourceNotFound;
import com.danils.millers.payondemand.service.users.model.User;
import com.danils.millers.payondemand.service.users.port.inbound.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import utils.PatchUtility;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User getById(UUID id) {
        return userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFound("User", "id", id.toString())
        );
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
    public UUID delete(UUID id) {
        userRepository.deleteById(id);

        return id;
    }

    @Override
    public boolean addOccupationToUser(UUID userId, UUID occupationId) {
        return false;
    }

    @Override
    public boolean removeOccupationFromUser(UUID userId, UUID occupationId) {
        return false;
    }

    @Override
    public void addCompanyToUser(UUID userId, UUID companyId) {

    }

    @Override
    public boolean removeCompanyFromUser(UUID userId, UUID companyId) {
        return false;
    }

    @Override
    public void addPaymentRequestToUser(UUID userId, UUID paymentRequestId) {

    }

    @Override
    public boolean removePaymentRequestFromUser(UUID userId, UUID paymentRequestId) {
        return false;
    }

    @Override
    public void changeUserPaymentRequestStatus(UUID userId, UUID paymentRequestId, String status) {

    }
}
