import { useEffect, useState } from "react";
import { DndContext, type DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import styles from "./board.module.css";

import { PostColumn } from "../components/post-column/post-column";
import { type Task } from "../data/tasks";
import { initialColumns } from "../data/columns";
import { fetchTickets, updateTicketStatus } from "../lib/api";

export function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState(initialColumns);
  const [activeForm, setActiveForm] = useState<string | null>(null);

  // fetch tickets from database on mount
  useEffect(() => {
    fetchTickets(1).then(setTasks);
  }, []);

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    // 1) i'm dropping a task over another task
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].status = tasks[overIndex].status;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // 2) i'm dropping a task over a column
    if (isActiveTask && isOverColumn) {
      const newStatus = overId as Task["status"];

      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        tasks[activeIndex].status = newStatus;
        return arrayMove(tasks, activeIndex, activeIndex);
      });

      // save to database
      updateTicketStatus(Number(activeId), newStatus);
    }
  }

  function deleteColumn(columnId: string) {
    setColumns((prev) => prev.filter((col) => col.id !== columnId));
    setTasks((prev) => prev.filter((task) => task.status !== columnId));
  }

  // function editColumnTitle(id: string, title: string) {
  //   // find column index
  //   const columnIndex = columns.findIndex((col) => col.id === id);
  //   console.log("columnIdex", columnIndex);

  //   columns.map((col)=> col[columnIndex].title === "")

  //   //change title
  //   setColumns((prev) => console.log("prev", prev));
  // }

  return (
    <DndContext onDragOver={handleDragOver}>
      <div className={styles.columnWrapper}>
        {columns.map((column) => (
          <PostColumn
            key={column.id}
            status={column.id}
            tasks={tasks}
            deleteColumn={deleteColumn}
            showForm={activeForm === column.id}
            onOpenForm={() => setActiveForm(column.id)}
            onCloseForm={() => setActiveForm(null)}
            // editColumnTitle={editColumnTitle}
          >
            {column.title}
          </PostColumn>
        ))}
      </div>
    </DndContext>
  );
}
