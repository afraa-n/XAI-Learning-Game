import React from 'react';
import { Score } from '../types';

interface LeaderboardProps {
  scores: Score[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg shadow p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="py-2 px-4 text-left">Rank</th>
            <th className="py-2 px-4 text-left">Player</th>
            <th className="py-2 px-4 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((score, index) => (
            <tr key={index} className="border-b border-gray-400">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{score.playerName}</td>
              <td className="py-2 px-4 text-right font-mono">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;