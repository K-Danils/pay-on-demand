package com.danils.millers.payondemand.service.occupations.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

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

    @Column(name="comments")
    private @Getter @Setter String comments;

    @Column(name = "createdAt")
    private @Getter @Setter OffsetDateTime createdAt;

    @Column(name = "updatedAt")
    private @Getter @Setter OffsetDateTime updatedAt;
}
