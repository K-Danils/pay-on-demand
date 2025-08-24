package com.danils.millers.payondemand.service.users.port.inbound;

import com.danils.millers.payondemand.service.users.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService {
    List<User> getAll();
    User getById(UUID id);
    User save(User user);
    User update(User user);
    UUID delete(UUID id);
    boolean addOccupationToUser(UUID userId, UUID occupationId);
    boolean removeOccupationFromUser(UUID userId, UUID occupationId);
    void addCompanyToUser(UUID userId, UUID companyId);
    boolean removeCompanyFromUser(UUID userId, UUID companyId);
    void addPaymentRequestToUser(UUID userId, UUID paymentRequestId);
    boolean removePaymentRequestFromUser(UUID userId, UUID paymentRequestId);
    void changeUserPaymentRequestStatus(UUID userId, UUID paymentRequestId, String status);
}
