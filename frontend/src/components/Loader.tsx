import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full border-4 border-t-transparent border-emerald-400 animate-spin"></div>
        <div className="absolute h-16 w-16 rounded-full border-4 border-b-transparent border-gray-300 animate-spin-slow"></div>
        <span className="text-white text-sm font-medium mt-32 absolute top-[110%]">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
