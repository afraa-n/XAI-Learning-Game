import React, { useState, useEffect } from 'react';
import { GameTheme } from '../types';

interface MiniGameProps {
    theme: GameTheme;
    onComplete: (score: number) => void;
}

const MiniGame: React.FC<MiniGameProps> = ({ theme, onComplete }) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [targets, setTargets] = useState<Array<{id: number; x: number; y: number}>>([]);

    const themeColors: Record<GameTheme, string> = {
        tech: 'from-blue-500 to-purple-500',
        medical: 'from-green-500 to-teal-500',
        environmental: 'from-teal-500 to-lime-500',
        financial: 'from-yellow-500 to-orange-500',
        business: 'from-indigo-500 to-pink-500',
        entertainment: 'from-purple-500 to-red-500',
      };
      
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onComplete(score);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        spawnTargets();

        return () => clearInterval(timer);
    }, []);

    const spawnTargets = () => {
        const newTargets = Array(3).fill(0).map(() => ({
            id: Math.random(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
        }));
        setTargets(newTargets);
    };

    const handleTargetClick = (id: number) => {
        setScore(prev => prev + 10);
        setTargets(prev => prev.filter(t => t.id !== id));
        if (targets.length <= 1) {
            spawnTargets();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm 
                      flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-[800px] h-[600px] relative">
                <div className="absolute top-4 right-4 flex space-x-4 text-xl font-bold">
                    <div>Time: {timeLeft}s</div>
                    <div>Score: {score}</div>
                </div>

                {targets.map(target => (
                    <div
                        key={target.id}
                        className={`
                            absolute w-12 h-12 rounded-full cursor-pointer
                            transition-transform hover:scale-110 bg-gradient-to-br
                            ${themeColors[theme]}
                        `}
                        style={{
                            left: `${target.x}%`,
                            top: `${target.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => handleTargetClick(target.id)}
                    />
                ))}

                <div className="absolute bottom-4 left-4 right-4 text-center text-gray-600">
                    Click the targets as quickly as possible!
                </div>
            </div>
        </div>
    );
};

export default MiniGame;