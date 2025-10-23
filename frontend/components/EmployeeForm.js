'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EMPLOYEE, GET_DEPARTMENTS } from '../lib/queries';

export default function EmployeeForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});

  const { data: departmentsData } = useQuery(GET_DEPARTMENTS);
  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      onSuccess();
    },
    onError: (error) => {
      console.error('Error adding employee:', error);
    }
  });

  const departments = departmentsData?.getDepartments || [];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.salary || isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Valid salary is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await addEmployee({
        variables: {
          name: formData.name.trim(),
          position: formData.position.trim(),
          department: formData.department,
          salary: Number(formData.salary)
        }
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter employee name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Position *
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`input-field ${errors.position ? 'border-red-500' : ''}`}
              placeholder="Enter position"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position}</p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department *
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`input-field ${errors.department ? 'border-red-500' : ''}`}
            >
              <option value="">Select a department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name} (Floor {dept.floor})
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department}</p>
            )}
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
              Salary *
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={`input-field ${errors.salary ? 'border-red-500' : ''}`}
              placeholder="Enter salary"
              min="0"
              step="0.01"
            />
            {errors.salary && (
              <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
