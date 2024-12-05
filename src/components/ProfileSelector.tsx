import React, { useState } from 'react';
import { CharacterType } from '../types';
import { CHARACTERS } from '../data/characters';

interface ProfileSelectorProps {
    onSelect: (character: CharacterType, name: string) => void;
    CharacterAvatar: { [key in CharacterType]: string };
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelect, CharacterAvatar }) => {
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);
    const [playerName, setPlayerName] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 flex items-center justify-center">
            <div className="max-w-4xl w-full">
                <h1 className="text-4xl font-bold text-white text-center mb-12">
                    Choose Your XAI Guide
                </h1>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    {Object.entries(CHARACTERS).map(([id, character]) => (
                        <div
                            key={id}
                            onClick={() => setSelectedCharacter(id as CharacterType)}
                            className={`
                                bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer
                                transition-all duration-300 hover:transform hover:scale-105
                                ${selectedCharacter === id ? 'ring-4 ring-blue-400' : ''}
                            `}
                        >
                            <div className="flex items-center space-x-4">
                                <img 
                                    src={CharacterAvatar[id as CharacterType]} 
                                    alt={character.name} 
                                    className="w-24 h-24 object-cover rounded-full"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        {character.name}
                                    </h3>
                                    <p className="text-blue-200">
                                        {character.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-white/20 text-white placeholder-white/50 
                                 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    onClick={() => selectedCharacter && playerName && onSelect(selectedCharacter, playerName)}
                    disabled={!selectedCharacter || !playerName}
                    className={`
                        w-full py-4 rounded-lg text-lg font-bold transition-all duration-300
                        ${selectedCharacter && playerName
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-gray-500 text-gray-300 cursor-not-allowed'}
                    `}
                >
                    Begin Your Journey
                </button>
            </div>
        </div>
    );
};

export default ProfileSelector;