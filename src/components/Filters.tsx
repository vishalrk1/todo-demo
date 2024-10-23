import React from "react";

const Filters = () => {
  return (
    <div className="flex space-x-2" role="tablist" aria-label="Filter tasks">
      <button
        role="tab"
        aria-selected="true"
        className="px-4 py-1 bg-green-500 text-white rounded-md"
      >
        All
      </button>
      <button
        role="tab"
        aria-selected="false"
        className="px-4 py-1 bg-gray-200 text-gray-700 rounded-md"
      >
        Completed
      </button>
      <button
        role="tab"
        aria-selected="false"
        className="px-4 py-1 bg-gray-200 text-gray-700 rounded-md"
      >
        Incomplete
      </button>
    </div>
  );
};

export default Filters;
