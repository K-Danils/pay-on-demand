package com.danils.millers.payondemand.service.users.model;

import com.danils.millers.payondemand.entities.Company;
import com.danils.millers.payondemand.entities.Occupation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private @Getter @Setter String id;

    @ManyToMany
    @JoinTable(
            name = "user_companies",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "company_id")
    )
    private @Getter @Setter List<Company> companies;

    @ManyToMany
    @JoinTable(
            name = "user_occupations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "occupation_id")
    )
    private @Getter @Setter List<Occupation> occupations;

    @Column(name = "name")
    private @Getter @Setter String name;

    @Column(name = "surname")
    private @Getter @Setter String surname;

    @Column(name = "email")
    private @Getter @Setter String email;

    @Column(name = "personal_number")
    private @Getter @Setter String personalNumber;
}
