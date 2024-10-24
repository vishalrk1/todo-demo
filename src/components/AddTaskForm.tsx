import { useContext, useState } from "react";
import { TaskContext, TaskContextType } from "../context/TaskContext";

const AddTaskForm = () => {
  const taskContext = useContext<TaskContextType | undefined>(TaskContext);
  const [taskTitle, setTaskTitle] = useState<string>("");
  if (!taskContext) {
    return null;
  }
  const { addTask } = taskContext;

  return (
    <section aria-label="Add new task">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask(taskTitle);
          setTaskTitle("");
        }}
      >
        <div className="mb-2">
          <label htmlFor="new-task" className="sr-only">
            New task
          </label>
          <input
            id="new-task"
            type="text"
            placeholder="Type something"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full p-2 md:p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 md:p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add Task
        </button>
      </form>
    </section>
  );
};

export default AddTaskForm;
