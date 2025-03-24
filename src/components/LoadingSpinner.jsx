import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
      <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

export default LoadingSpinner;
