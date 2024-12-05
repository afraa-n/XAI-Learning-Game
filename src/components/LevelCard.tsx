import React from 'react';
import { Level } from '../types';

interface LevelCardProps {
    level: Level;
    isSelected: boolean;
    isUnlocked: boolean;
    onSelect: (levelId: number) => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, isSelected, isUnlocked, onSelect }) => {
    return (
        <div
            className={`
                bg-white rounded-lg shadow-md p-4 cursor-pointer
                ${isSelected ? 'ring-4 ring-blue-400' : ''}
                ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
            `}
            onClick={() => isUnlocked && onSelect(level.id)}
        >
            <h3 className="text-xl font-bold">{level.title}</h3>
            <p className="text-gray-600">{level.description}</p>
        </div>
    );
};

export default LevelCard;