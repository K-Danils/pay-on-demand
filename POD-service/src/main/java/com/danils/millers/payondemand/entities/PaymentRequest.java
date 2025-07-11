package com.danils.millers.payondemand.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Table(name="payment_request")
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private @Getter @Setter String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private @Getter @Setter User user;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private @Getter @Setter Company company;

    @ManyToOne
    @JoinColumn(name = "occupation_id")
    private @Getter @Setter Occupation occupation;

    @Column(name="amount")
    private @Getter @Setter double amount;

    @Column(name="status")
    private @Getter @Setter String status;

    @Column(name = "createdAt")
    private @Getter @Setter OffsetDateTime createdAt;

}
