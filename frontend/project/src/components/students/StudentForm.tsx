import React, { useState } from 'react';
import { Student, StudentFormData } from '../../types/student';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { toISODate } from '../../utils/date';

interface StudentFormProps {
  onSubmit: (student: Student) => Promise<void>;
  initialData?: Student;
  onCancel?: () => void;
}

export function StudentForm({ onSubmit, initialData, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    grade: initialData?.grade || '',
    dateOfBirth: initialData?.dateOfBirth ? toISODate(initialData.dateOfBirth) : '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      id: initialData?.id ?? '',
    });
    
    if (!initialData) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        grade: '',
        dateOfBirth: '',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="First Name"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Grade"
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
        <Input
          label="Date of Birth"
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button type="submit">
          {initialData ? 'Update' : 'Add'} Student
        </Button>
      </div>
    </form>
  );
}