import Filters from "./components/Filters";
import AddTaskForm from "./components/AddTaskForm";
import Searchbar from "./components/Searchbar";
import TaskCard from "./components/TaskCard";

import { useContext } from "react";
import { TaskContext, TaskContextType } from "./context/TaskContext";

function App() {
  const taskContext = useContext<TaskContextType | undefined>(TaskContext);
  if (!taskContext) {
    return null;
  }

  const { filteredTasks } = taskContext;

  return (
    <main className="min-h-screen max-w-6xl p-6 mx-auto">
      <section className="w-full flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-8 mt-12">
        <h1 className="text-3xl font-bold">Today</h1>
        <Searchbar />
        <Filters />
      </section>
      <section className="w-full mt-6 mb-2 flex flex-col gap-4">
        <section className="w-full my-6 flex flex-col gap-4">
          {filteredTasks.length === 0 && (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-base md:text-lg text-gray-400">
                No Data Found 😥
              </h1>
            </div>
          )}
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      </section>
      <AddTaskForm />
    </main>
  );
}

export default App;
