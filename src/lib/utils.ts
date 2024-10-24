import { Task } from "./Types";

const STORAGE_KEY = "todo";

export const saveToLocalStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to local storage:", error);
  }
};

export const loadFromLocalStorage = (): Task[] => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Error loading tasks from local storage:", error);
  }
  return [];
};
