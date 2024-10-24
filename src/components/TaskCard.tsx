import React, { useContext } from "react";
import { Task } from "../lib/Types";
import { TaskContext, TaskContextType } from "../context/TaskContext";
import { Check, X } from "lucide-react";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const taskContext = useContext<TaskContextType | undefined>(TaskContext);
  if (!taskContext) {
    return null;
  }

  const { toggleTask, removeTask } = taskContext;
  return (
    <div
      key={task.id}
      className={`flex items-start gap-3 p-4 rounded-lg transition-colors duration-200 ${
        task.completed
          ? "bg-green-50 border-green-500"
          : "bg-white border-gray-200"
      } border shadow-sm`}
    >
      <div className="relative flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={`Mark "${task.title}" as ${
            task.completed ? "incomplete" : "complete"
          }`}
          className="h-6 w-6 mt-[2px] rounded-full border-2 border-gray-300 text-green-500 focus:ring-2 focus:ring-transparent focus:ring-offset-2 transition-colors duration-200 checked:border-green-500 cursor-pointer appearance-none"
        />
        {task.completed && (
          <Check
            size={16}
            className="absolute bottom-1 pointer-events-none text-green-500"
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`transition-all duration-200 break-words pr-2 ${
            task.completed ? "line-through text-gray-500" : "text-gray-900"
          }`}
        >
          {task.title}
        </p>
      </div>

      <button
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
        aria-label={`Delete task: ${task.title}`}
        onClick={() => removeTask(task.id)}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TaskCard;
