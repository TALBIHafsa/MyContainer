import axios from 'axios';
import { Student, StudentFormData } from '../types/student';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://talbi.backend.com/api/' // Update to use Docker network name
});

export const studentApi = {
  getAll: async () => {
    const response = await api.get<Student[]>('/students');
    return response.data;
  },
  
  create: async (student: StudentFormData) => {
    console.log('Student data in create method:', student);

    const response = await api.post<Student>('/students', student, {
      headers: { 'Content-Type': 'application/json' },

    });
    return response.data;
  },
  
  update: async (id: string, student: StudentFormData) => {
    const response = await api.put<Student>(`/students/${id}`, student);
    return response.data;
  },
  
  delete: async (id: string) => {
    await api.delete(`/students/${id}`);
  }
};