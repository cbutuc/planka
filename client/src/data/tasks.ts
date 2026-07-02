export type Task = {
  id: number;                       
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";  
  created_at: string;                  
  project_id: number;                   
  assignee_id: number | null;           
  reporter_id: number | null;          
};

export const initialTasks: Task[] = []; // empty array, data comes from DB now


// export const initialTasks: Task[] = [
//   {
//     id: "1",
//     title: "Complete React Course",
//     description: "Finish all lessons and exercises in the React course.",
//     status: "todo",
//     date: "Fri Jan 30 2026"
//   },
//   {
//     id: "2",
//     title: "Go on vacation",
//     description: "Plan and enjoy a relaxing trip away from work.",
//     status: "todo",
//     date: "Fri Jan 30 2026"
//   },
//   {
//     id: "3",
//     title: "Go to the doctor",
//     description: "Schedule and attend a routine medical check-up.",
//     status: "todo",
//     date: "Fri Jan 30 2026"
//   },
//   {
//     id: "4",
//     title: "Go to the park",
//     description: "Spend some time outdoors and get fresh air.",
//     status: "todo",
//     date: "Fri Jan 30 2026"
//   },
// ];