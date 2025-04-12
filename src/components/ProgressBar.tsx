import React from "react";

interface ProgressBarProps {
  progressPercentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercentage }) => {
    return (
      <div className="p-2 rounded-lg">
        {/* Progress Bar Container */}
        <div className="w-full bg-gray-300 rounded-full overflow-hidden">
          <div
            className={`h-4 transition-all duration-500 ease-in-out ${
              progressPercentage === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

export default ProgressBar;