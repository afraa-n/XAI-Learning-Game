import React from 'react';
import { Level, LevelMapProps } from '../types';
import LevelCard from './LevelCard';

const LevelMap: React.FC<LevelMapProps> = ({ levels, currentLevel, unlockedLevels, onSelectLevel }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Level Selection</h1>
        <div className="grid grid-cols-3 gap-8">
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              isSelected={level.id === currentLevel + 1}
              isUnlocked={unlockedLevels.includes(level.id)}
              onSelect={onSelectLevel}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelMap;