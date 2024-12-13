package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.repository.StudentRepository;
import com.example.studentmanagement.exception.StudentNotFoundException;
import com.example.studentmanagement.exception.EmailAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public Student getStudentById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }
    
    @Transactional
    public Student createStudent(Student student) {
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new EmailAlreadyExistsException(student.getEmail());
        }
        return studentRepository.save(student);
    }
    
    @Transactional
    public Student updateStudent(String id, Student studentDetails) {
        Student student = getStudentById(id);
        
        if (!student.getEmail().equals(studentDetails.getEmail()) && 
            studentRepository.existsByEmail(studentDetails.getEmail())) {
            throw new EmailAlreadyExistsException(studentDetails.getEmail());
        }
        
        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setEmail(studentDetails.getEmail());
        student.setGrade(studentDetails.getGrade());
        student.setDateOfBirth(studentDetails.getDateOfBirth());
        
        return studentRepository.save(student);
    }
    
    @Transactional
    public void deleteStudent(String id) {
        if (!studentRepository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        studentRepository.deleteById(id);
    }
}