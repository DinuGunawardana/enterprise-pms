'use client';

import { useState } from 'react';

import {
  createProject,
} from '../../services/projectService';

export default function ProjectForm() {

  /**
   * Form states
   */
  const [name, setName] =
    useState('');

  const [description, setDescription] =
    useState('');

  /**
   * Handles form submit
   */
  async function handleSubmit(
    e: React.FormEvent
  ) {

    /**
     * Prevent page refresh
     */
    e.preventDefault();

    try {

      /**
       * Creates project
       */
      await createProject({
        name,
        description,
      });

      alert('Project Created');

      /**
       * Clears form
       */
      setName('');
      setDescription('');

    } catch (error) {

      console.error(error);

      alert('Failed');
    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <input
        type="text"
        placeholder="Project Name"
        className="w-full rounded border p-3"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        className="w-full rounded border p-3"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Create Project
      </button>

    </form>
  );
}