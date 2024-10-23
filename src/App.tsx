import { Check, Search, X } from "lucide-react";
import Filters from "./components/Filters";
import { useContext } from "react";
import { TaskContext, TaskContextType } from "./context/TaskContext";

function App() {
  const taskContext = useContext<TaskContextType | undefined>(TaskContext);
  if (!taskContext) {
    return null;
  }

  const { tasks } = taskContext;
  // const [tasks, setTasks] = useState<Task[]>([
  //   { id: "1", title: "Brush teeth", completed: true, createdAt: Date.now() },
  //   { id: "2", title: "Buy grocery", completed: true, createdAt: Date.now() },
  //   { id: "3", title: "Pay rent", completed: false, createdAt: Date.now() },
  //   { id: "4", title: "Clean room", completed: false, createdAt: Date.now() },
  // ]);

  return (
    <main className="min-h-screen max-w-6xl p-6 mx-auto">
      <section className="w-full flex items-center space-x-8 mt-12">
        <h1 className="text-3xl font-bold">Today</h1>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search"
            aria-label="Search tasks"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <Filters />
      </section>
      <section className="w-full mt-6 mb-2 flex flex-col gap-4">
        <section className="w-full my-6 flex flex-col gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 ${
                task.completed
                  ? "bg-green-50 border-green-500"
                  : "bg-white border-gray-200"
              } border shadow-sm`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative h-full flex items-center justify-center bg-gray-100 rounded-full">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {
                      setTasks(
                        tasks.map((t) =>
                          t.id === task.id
                            ? { ...t, completed: !t.completed }
                            : t
                        )
                      );
                    }}
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
                <span className="flex items-center space-x-2">
                  <span
                    className={`transition-all duration-200 ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </span>
                </span>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
                aria-label={`Delete task: ${task.title}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </section>
      </section>
      <section aria-label="Add new task">
        <form onSubmit={() => {}} className="space-y-2">
          <div className="mb-4">
            <label htmlFor="new-task" className="sr-only">
              New task
            </label>
            <input
              id="new-task"
              type="text"
              placeholder="Type something"
              className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add Task
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;
