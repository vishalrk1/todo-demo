export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = "all" | "active" | "completed";

export interface DeletedTaskState {
  task: Task;
  index: number;
}
