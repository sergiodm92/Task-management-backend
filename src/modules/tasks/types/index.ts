import { Task } from "../tasks.entity";

export enum TaskStatus {
    InProgress = 'in_progress',
    Completed = 'completed',
    Pending = 'pending',
}

interface Tag {
    id: number;
    name: string;
}

export interface TaskCountsByState {
    in_progress: number;
    completed: number;
    pending: number;
}

export interface FindAndCountResult {
    tasks: Task[];
    totalTasks: number;
    taskCountsByState: TaskCountsByState;
}


export interface PaginatedTasksResult {
    tasks: Task[];
    totalTasks: number;
    taskCountsByState: {
      in_progress: number;
      completed: number;
      pending: number;
    };
  }