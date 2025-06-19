package com.danils.millers.payondemand.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="user")
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private @Getter @Setter String id;

    private @Getter @Setter List<Company> companies;
    private @Getter @Setter List<Occupation> occupations;

    @Column(name="name")
    private @Getter @Setter String name;
    @Column(name="surname")
    private @Getter @Setter String surname;
    @Column(name="personal_number")
    private @Getter @Setter String personalNumber;

}
