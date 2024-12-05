import React from 'react';

interface ProgressBarProps {
    completedLevels: number;
    totalLevels: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedLevels, totalLevels }) => {
    const percentage = (completedLevels / totalLevels) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 fixed top-0 left-0">
            <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;