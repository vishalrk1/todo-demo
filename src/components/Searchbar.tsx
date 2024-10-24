import { Search } from "lucide-react";
import { useContext } from "react";
import { TaskContext, TaskContextType } from "../context/TaskContext";

const Searchbar = () => {
  const taskContext = useContext<TaskContextType | undefined>(TaskContext);
  if (!taskContext) {
    return null;
  }
  const { searchQuery, setSearchQuery } = taskContext;

  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Search"
        aria-label="Search tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
    </div>
  );
};

export default Searchbar;
