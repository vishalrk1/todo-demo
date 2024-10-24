import { useContext } from "react";
import { TaskContext, TaskContextType } from "../context/TaskContext";

const Filters = () => {
  const taskContext = useContext<TaskContextType | undefined>(TaskContext);
  if (!taskContext) {
    return null;
  }

  const { filter, setFilter } = taskContext;

  const filterButtons = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Active", value: "active" },
  ] as const;

  return (
    <div className="flex space-x-2" role="tablist" aria-label="Filter tasks">
      {filterButtons.map(({ label, value }) => (
        <button
          key={value}
          role="tab"
          aria-selected={filter === value}
          onClick={() => setFilter(value)}
          className={`px-4 py-1 rounded-md transition-colors duration-200 ${
            filter === value
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Filters;
