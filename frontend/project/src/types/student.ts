export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  dateOfBirth: string;
}

export type StudentFormData = Omit<Student, 'id'>;