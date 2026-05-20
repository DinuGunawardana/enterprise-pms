'use client';

import { useEffect, useState } from 'react';

import {
  getDepartments,
} from '../../../services/departmentService';

export default function DepartmentsPage() {

  /**
   * Stores department list
   */
  const [departments, setDepartments] =
    useState<any[]>([]);

  /**
   * Runs when page loads
   */
  useEffect(() => {

    loadDepartments();

  }, []);

  /**
   * Fetches departments
   */
  async function loadDepartments() {

    try {

      const data =
        await getDepartments();

      setDepartments(data);

    } catch (error) {

      console.error(error);
    }
  }

  return (

    <div className="p-6">

      <h1 className="mb-6 text-4xl font-bold">
        Departments
      </h1>

      <div className="space-y-4">

        {departments.map((department) => (

          <div
            key={department.id}
            className="rounded border p-4"
          >

            <h2 className="text-2xl font-semibold">
              {department.name}
            </h2>

            <p className="text-gray-500">
              {department.description}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}