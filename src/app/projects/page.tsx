'use client';

import { useEffect, useState } from 'react';

import {
  getProjects,
} from '../../services/projectService';

export default function ProjectsPage() {

  /**
   * Stores projects list
   */
  const [projects, setProjects] =
    useState<any[]>([]);

  /**
   * Runs on first page load
   */
  useEffect(() => {

    loadProjects();

  }, []);

  /**
   * Fetches projects
   */
  async function loadProjects() {

    try {

      const data =
        await getProjects();

      setProjects(data);

    } catch (error) {

      console.error(error);
    }
  }

  return (

    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Projects
        </h1>

        <button
          className="rounded bg-black px-4 py-2 text-white"
        >
          Create Project
        </button>

      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {projects.map((project) => (

          <div
            key={project.id}
            className="rounded-lg border p-4 shadow-sm"
          >

            <h2 className="text-2xl font-semibold">
              {project.name}
            </h2>

            <p className="mt-2 text-gray-500">
              {project.description}
            </p>

            <div className="mt-4">

              <span
                className="rounded bg-gray-200 px-2 py-1 text-sm"
              >
                {project.status}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}