import type { Task } from "./tasks";

export type Column = {
  id: Task["status"];
  title: string;
};

export const initialColumns: Column[] = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
];