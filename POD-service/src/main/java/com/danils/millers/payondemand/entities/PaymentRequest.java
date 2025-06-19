package com.danils.millers.payondemand.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="payment_request")
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private @Getter @Setter String id;

    @Column(name="user_id")
    private @Getter @Setter String userId;

    @Column(name="company_id")
    private @Getter @Setter String companyId;

    @Column(name="amount")
    private @Getter @Setter double amount;

    @Column(name="confirmed")
    private @Getter @Setter bool isConfirmed;

}
