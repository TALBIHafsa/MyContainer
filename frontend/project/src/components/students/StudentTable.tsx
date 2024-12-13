import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Student } from '../../types/student';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/date';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
  return (
    <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Grade</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date of Birth</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                <div className="font-medium text-gray-900">
                  {student.firstName} {student.lastName}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {student.email}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {student.grade}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatDate(student.dateOfBirth)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(student)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(student.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}