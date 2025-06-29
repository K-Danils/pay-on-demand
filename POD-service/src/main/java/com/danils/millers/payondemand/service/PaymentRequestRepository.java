package com.danils.millers.payondemand.service;

import com.danils.millers.payondemand.entities.PaymentRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRequestRepository extends JpaRepository<PaymentRequest, String> {
}
