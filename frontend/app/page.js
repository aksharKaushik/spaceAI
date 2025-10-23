'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT, GET_DEPARTMENTS } from '../lib/queries';
import EmployeeForm from '../components/EmployeeForm';

export default function HomePage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const { data: departmentsData } = useQuery(GET_DEPARTMENTS);
  
  const { data: allEmployeesData, loading: allLoading, error: allError } = useQuery(GET_ALL_EMPLOYEES);
  
  const { data: filteredEmployeesData, loading: filteredLoading, error: filteredError } = useQuery(
    GET_EMPLOYEES_BY_DEPARTMENT,
    {
      variables: { department: selectedDepartment },
      skip: selectedDepartment === 'all'
    }
  );

  const employees = selectedDepartment === 'all' 
    ? allEmployeesData?.getAllEmployees || []
    : filteredEmployeesData?.getEmployeesByDepartment || [];

  const loading = selectedDepartment === 'all' ? allLoading : filteredLoading;
  const error = selectedDepartment === 'all' ? allError : filteredError;

  const departments = departmentsData?.getDepartments || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error loading employees: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="input-field sm:w-64"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name} (Floor {dept.floor})
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add New Employee
        </button>
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedDepartment === 'all' ? 'All Employees' : `${selectedDepartment} Employees`}
          </h2>
        </div>
        
        {employees.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            No employees found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link
                        href={`/employee/${employee.id}`}
                        className="text-primary-600 hover:text-primary-900 font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <EmployeeForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            // Refetch data
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
