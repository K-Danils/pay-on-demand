package com.danils.millers.payondemand.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="occupation")
@NoArgsConstructor
@AllArgsConstructor
public class Occupation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private @Getter
    @Setter String id;

    @Column(name="company_id")
    private @Getter @Setter String companyId;

    @Column(name="name")
    private @Getter @Setter String name;
}