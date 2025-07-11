package com.danils.millers.payondemand.rest;

import com.danils.millers.payondemand.entities.PaymentRequest;
import com.danils.millers.payondemand.service.OccupationRepository;
import com.danils.millers.payondemand.service.PaymentRequestRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PaymentRequestRestController {
    private PaymentRequestRepository paymentRequestRepository;

    public PaymentRequestRestController(PaymentRequestRepository paymentRequestRepository){
        this.paymentRequestRepository = paymentRequestRepository;
    }

    @GetMapping("/paymentRequests")
    public List<PaymentRequest> getPaymentRequests(){
        return paymentRequestRepository.findAll();
    }

    @GetMapping("/paymentRequests/{id}")
    public PaymentRequest getPaymentRequest(@PathVariable String id){
        return paymentRequestRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "PaymentRequest not found"));
    }

    @PostMapping("/paymentRequests")
    public PaymentRequest addPaymentRequest(@RequestBody PaymentRequest paymentRequest) {
        paymentRequest.setId(null);
        return paymentRequestRepository.save(paymentRequest);
    }

    @PatchMapping("/paymentRequests")
    public PaymentRequest updatePaymentRequest(@PathVariable String id, @RequestBody Map<String, Object> payload) {
        PaymentRequest foundPaymentRequest = paymentRequestRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "PaymentRequest not found"));

        if (
                payload.containsKey("id") ||
                        !payload.containsKey("isConfirmed") ||
                        !payload.containsKey("amount")
        ) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot update ID");
        }

        //foundPaymentRequest.setConfirmed((Boolean) payload.get("isConfirmed"));

        Object amount = payload.get("amount");
        if (amount instanceof Number) {
            foundPaymentRequest.setAmount(((Number) amount).doubleValue());
        } else {
            foundPaymentRequest.setAmount(Double.parseDouble(amount.toString()));
        }

        return paymentRequestRepository.save(foundPaymentRequest);
    }
}
