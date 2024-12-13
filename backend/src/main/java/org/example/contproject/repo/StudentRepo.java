package org.example.contproject.repo;

import org.example.contproject.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, String> {
    boolean existsByEmail(String email);
}