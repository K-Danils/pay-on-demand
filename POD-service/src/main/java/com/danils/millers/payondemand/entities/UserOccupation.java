package com.danils.millers.payondemand.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="user_occupation")
@NoArgsConstructor
@AllArgsConstructor
public class UserOccupation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private @Getter
    @Setter String id;

    @Column(name="company_id")
    private @Getter @Setter String companyId;

    @Column(name="user_id")
    private @Getter @Setter String userId;
}