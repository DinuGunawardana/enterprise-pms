'use client';

import {
  DndContext,
} from '@dnd-kit/core';

import { useEffect, useState } from 'react';

import {
  getTasks,
} from '../../services/taskService';

export default function KanbanBoard() {

  /**
   * Stores tasks
   */
  const [tasks, setTasks] =
    useState<any[]>([]);

  /**
   * Loads tasks initially
   */
  useEffect(() => {

    loadTasks();

  }, []);

  /**
   * Fetch tasks
   */
  async function loadTasks() {

    const data =
      await getTasks();

    setTasks(data);
  }

  /**
   * Triggered when drag ends
   */
  function handleDragEnd(
    event: any
  ) {

    console.log(
      'Task moved:',
      event
    );

    /**
     * Later:
     * update status in database
     */
  }

  return (

    <DndContext
      onDragEnd={handleDragEnd}
    >

      <div
        className="
          grid
          grid-cols-4
          gap-4
          p-6
        "
      >

        <div className="rounded bg-gray-100 p-4">
          <h2 className="mb-4 text-xl font-bold">
            TODO
          </h2>
        </div>

        <div className="rounded bg-gray-100 p-4">
          <h2 className="mb-4 text-xl font-bold">
            IN PROGRESS
          </h2>
        </div>

        <div className="rounded bg-gray-100 p-4">
          <h2 className="mb-4 text-xl font-bold">
            REVIEW
          </h2>
        </div>

        <div className="rounded bg-gray-100 p-4">
          <h2 className="mb-4 text-xl font-bold">
            DONE
          </h2>
        </div>

      </div>

    </DndContext>
  );
}