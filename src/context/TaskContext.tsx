import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import debounce from "lodash.debounce";
import { FilterType, Task } from "../lib/Types";
import { SucessToast } from "../components/SucessToast";

const STORAGE_KEY = "todo";

const saveToLocalStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to local storage:", error);
  }
};

const loadFromLocalStorage = (): Task[] => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error("Error loading tasks from local storage:", error);
  }
  return [];
};

export interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filter: FilterType;
  searchQuery: string;
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => loadFromLocalStorage());
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    saveToLocalStorage(tasks);
  }, [tasks]);

  const addTask = useCallback((title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
    SucessToast("Task Added Successfully", true);
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    SucessToast("Task Removed Successfully", true);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    SucessToast("Task Updated Successfully", true);
  }, []);

  const setFilterCallback = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  const setSearchQueryCallback = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Memoize the filtering function
  const performFiltering = useCallback(() => {
    let result = [...tasks];

    switch (filter) {
      case "completed":
        result = result.filter((task) => task.completed);
        break;
      case "active":
        result = result.filter((task) => !task.completed);
        break;
    }

    if (searchQuery.trim()) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTasks(result);
  }, [tasks, filter, searchQuery]);

  // Memoize the debounced filtering function
  const debouncedFiltering = useMemo(
    () =>
      debounce(() => {
        performFiltering();
      }, 300),
    [performFiltering]
  );

  useEffect(() => {
    return () => {
      debouncedFiltering.cancel();
    };
  }, [debouncedFiltering]);

  useEffect(() => {
    debouncedFiltering();
  }, [tasks, filter, searchQuery, debouncedFiltering]);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      tasks,
      filteredTasks,
      filter,
      searchQuery,
      addTask,
      removeTask,
      toggleTask,
      setFilter: setFilterCallback,
      setSearchQuery: setSearchQueryCallback,
    }),
    [
      tasks,
      filteredTasks,
      filter,
      searchQuery,
      addTask,
      removeTask,
      toggleTask,
      setFilterCallback,
      setSearchQueryCallback,
    ]
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
