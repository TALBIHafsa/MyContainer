package com.example.studentmanagement.controller;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
    
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentService.getStudentById(id);
    }
    
    @PostMapping
    public Student createStudent(@Valid @RequestBody Student student) {
        return studentService.createStudent(student);
    }
    
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable String id, @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }
}