import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { StudentForm } from './components/students/StudentForm';
import { StudentTable } from './components/students/StudentTable';
import { Student } from './types/student';
import { studentApi } from './services/api';

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await studentApi.getAll();
      setStudents(data);
    } catch (error) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentData: Student) => {
    try {
      const newStudent = await studentApi.create(studentData);
      setStudents(prev => [...prev, newStudent]);
      toast.success('Student added successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to add student');
    }
  };

  const handleEditStudent = async (student: Student) => {
    try {
      const updatedStudent = await studentApi.update(student.id, student);
      setStudents(prev =>
        prev.map(s => (s.id === updatedStudent.id ? updatedStudent : s))
      );
      setEditingStudent(null);
      toast.success('Student updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update student');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      await studentApi.delete(id);
      setStudents(prev => prev.filter(student => student.id !== id));
      toast.success('Student deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to delete student');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Student Management System
        </h1>
        
        {editingStudent ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Edit Student
            </h2>
            <StudentForm
              onSubmit={handleEditStudent}
              initialData={editingStudent}
              onCancel={() => setEditingStudent(null)}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add New Student
            </h2>
            <StudentForm onSubmit={handleAddStudent} />
          </div>
        )}

        {loading ? (
          <div className="text-center mt-8">Loading students...</div>
        ) : students.length > 0 ? (
          <StudentTable
            students={students}
            onEdit={setEditingStudent}
            onDelete={handleDeleteStudent}
          />
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No students added yet.
          </p>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}