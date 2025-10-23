'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_EMPLOYEE_DETAILS } from '../../../lib/queries';

export default function EmployeeDetailPage({ params }) {
  const { id } = params;
  
  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Link href="/" className="btn-secondary">
          ← Back to Home
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading employee: {error.message}</p>
        </div>
      </div>
    );
  }

  const employee = data?.getEmployeeDetails;

  if (!employee) {
    return (
      <div className="space-y-4">
        <Link href="/" className="btn-secondary">
          ← Back to Home
        </Link>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-600">Employee not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="btn-secondary">
          ← Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>
      </div>

      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Employee Information</h2>
        </div>
        <div className="px-6 py-6">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Position</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.position}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Department</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.department}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Salary</dt>
              <dd className="mt-1 text-sm text-gray-900">
                ${employee.salary.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
