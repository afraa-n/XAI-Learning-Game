import React from 'react';

interface AchievementsProps {
    achievements: string[];
    recentlyUnlocked?: string;
}

const Achievements: React.FC<AchievementsProps> = ({ achievements, recentlyUnlocked }) => {
    return (
        <>
            {recentlyUnlocked && (
                <div className="fixed top-4 right-4 bg-yellow-400 text-yellow-900 
                               p-4 rounded-lg shadow-lg animate-float z-50">
                    <div className="text-lg font-bold flex items-center">
                        <span className="text-2xl mr-2">🏆</span>
                        Achievement Unlocked!
                    </div>
                    <div>{recentlyUnlocked}</div>
                </div>
            )}

            <div className="fixed top-4 left-4 bg-white/90 backdrop-blur-sm 
                          p-4 rounded-lg shadow-lg max-w-sm">
                <h3 className="font-bold mb-2 text-gray-800">
                    Achievements ({achievements.length})
                </h3>
                <div className="space-y-2">
                    {achievements.map((achievement, index) => (
                        <div key={index} 
                             className="flex items-center space-x-2 text-gray-700">
                            <span>🏆</span>
                            <span>{achievement}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Achievements;