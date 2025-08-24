package com.danils.millers.payondemand.service.users;

import com.danils.millers.payondemand.service.users.model.PaymentRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRequestRepository extends JpaRepository<PaymentRequest, String> {
}
