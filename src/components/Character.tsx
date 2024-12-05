import React, { useState } from 'react';
import { CharacterType } from '../types';
import wizardImg from '../assets/images/characters/wizard.png';
import robotImg from '../assets/images/characters/robot.png';
import scientistImg from '../assets/images/characters/scientist.png';
import explorerImg from '../assets/images/characters/explorer.png';

interface CharacterProps {
    type: CharacterType;
    message: string;
    mood?: 'neutral' | 'happy' | 'thinking';
}

const Character: React.FC<CharacterProps> = ({ type, message, mood = 'neutral' }) => {
    const [imageError, setImageError] = useState(false);

    const characterImages = {
        wizard: wizardImg,
        robot: robotImg,
        scientist: scientistImg,
        explorer: explorerImg,
    };

    const characterEmojis = {
        wizard: '🧙‍♂️',
        robot: '🤖',
        scientist: '👩‍🔬',
        explorer: '🗺️',
    };

    return (
        <div className="fixed bottom-4 left-4 flex items-end space-x-4">
            <div className="w-24 h-24 relative">
                {!imageError ? (
                    <img
                        src={characterImages[type]}
                        alt={type}
                        className="w-full h-full object-contain rounded-full"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div
                        className={`
                            w-full h-full rounded-full flex items-center justify-center text-4xl
                            ${type === 'wizard' ? 'bg-purple-500' : ''}
                            ${type === 'robot' ? 'bg-blue-500' : ''}
                            ${type === 'scientist' ? 'bg-green-500' : ''}
                            ${type === 'explorer' ? 'bg-yellow-500' : ''}
                        `}
                    >
                        {characterEmojis[type]}
                    </div>
                )}
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Character;