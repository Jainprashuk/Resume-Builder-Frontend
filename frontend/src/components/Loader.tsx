import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-500">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full border-4 border-t-transparent border-emerald-600 dark:border-emerald-400 animate-spin"></div>
        <div className="absolute h-16 w-16 rounded-full border-4 border-b-transparent border-gray-400 dark:border-gray-300 animate-spin-slow"></div>
        <span className="text-gray-900 dark:text-white text-sm font-medium mt-32 absolute top-[110%] transition-colors duration-500">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
