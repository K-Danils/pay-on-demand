package com.danils.millers.payondemand.service.companies.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name="company")
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private @Getter @Setter UUID id;

    @Column(name="name")
    private @Getter @Setter String name;

    @Column(name = "active")
    private @Getter @Setter Boolean active;

    @Column(name = "createdAt")
    private @Getter @Setter OffsetDateTime createdAt;

    @Column(name = "updatedAt")
    private @Getter @Setter OffsetDateTime updatedAt;
}

