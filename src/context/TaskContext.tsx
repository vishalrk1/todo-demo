import { createContext, useState } from "react";
import { Task } from "../lib/Types";

export interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};
