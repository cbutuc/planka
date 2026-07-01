import type { Task } from "./tasks";

export type Column = {
  id: Task["status"];
  title: string;
};

export const initialColumns: Column[] = [
  { id: "todo", title: "To do" },
  { id: "inProgress", title: "In progress" },
  { id: "done", title: "Done" },
];