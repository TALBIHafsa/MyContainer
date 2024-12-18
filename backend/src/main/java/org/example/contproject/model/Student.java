package org.example.contproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Grade is required")
    private String grade;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    @Version
    private Long version = 0L;
}