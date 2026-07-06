import { arrayMove } from "@dnd-kit/sortable";
import type { UniqueIdentifier } from "@dnd-kit/core";

import type { Task } from "../data/tasks";

// dropping a task onto another task: adopt that task's status, then reorder
export function moveTaskOverTask(
  tasks: Task[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
): Task[] {
  const activeIndex = tasks.findIndex((task) => task.id === activeId);
  const overIndex = tasks.findIndex((task) => task.id === overId);

  const updatedTasks = tasks.map((task, index) =>
    index === activeIndex
      ? { ...task, status: tasks[overIndex].status }
      : task,
  );

  return arrayMove(updatedTasks, activeIndex, overIndex);
}

// dropping a task onto a column: adopt that column's status
export function moveTaskToColumn(
  tasks: Task[],
  activeId: UniqueIdentifier,
  newStatus: Task["status"],
): Task[] {
  const activeIndex = tasks.findIndex((task) => task.id === activeId);

  const updatedTasks = tasks.map((task, index) =>
    index === activeIndex ? { ...task, status: newStatus } : task,
  );

  return arrayMove(updatedTasks, activeIndex, activeIndex);
}
