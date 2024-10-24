import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import debounce from "lodash.debounce";
import { DeletedTaskState, FilterType, Task } from "../lib/Types";
import toast from "react-hot-toast";
import { loadFromLocalStorage, saveToLocalStorage } from "../lib/utils";
import { SucessToast } from "../components/SucessToast";

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

  const lastDeletedTaskRef = useRef<DeletedTaskState | null>(null);

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
    SucessToast("Task Added Successfully");
  }, []);

  const handleUndo = useCallback((deletedTask: DeletedTaskState) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(deletedTask.index, 0, deletedTask.task);
      return newTasks;
    });
    SucessToast("Task Restored Successfully");
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.id === id);
      const deletedTask = prevTasks[taskIndex];

      // Store deleted task info in ref
      lastDeletedTaskRef.current = {
        task: deletedTask,
        index: taskIndex,
      };

      return prevTasks.filter((task) => task.id !== id);
    });
  }, []);

  // Handle toast showing after state update
  useEffect(() => {
    if (lastDeletedTaskRef.current) {
      const deletedTaskState = lastDeletedTaskRef.current;

      toast(
        (t) => (
          <div className="flex items-center gap-2">
            <span>Task Removed</span>
            <button
              onClick={() => {
                handleUndo(deletedTaskState);
                toast.dismiss(t.id);
              }}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Undo
            </button>
          </div>
        ),
        {
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }
      );
      lastDeletedTaskRef.current = null;
    }
  }, [tasks, handleUndo]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success("Task Updated Successfully");
  }, []);

  const setFilterCallback = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  const setSearchQueryCallback = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

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
