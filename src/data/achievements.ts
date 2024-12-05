import { Achievement, GameState, Score } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first_prediction',
        name: 'First Prediction',
        description: 'Make your first prediction',
        unlocked: false,
        icon: '🔮',
        condition: (state: GameState) => state.predictions.length > 0
    },
    {
        id: 'level_master',
        name: 'Level Master',
        description: 'Complete all levels',
        unlocked: false,
        icon: '🏆',
        condition: (state: GameState) => state.completedLevels.length === 10
    },
    {
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Get a 100% accuracy score',
        unlocked: false,
        icon: '⭐',
        condition: (state: GameState) => state.scores.some((score: Score) => score.score === 100)
    },
    {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Complete a level in under 30 seconds',
        unlocked: false,
        icon: '⚡',
        condition: (state: GameState) => state.lastLevelTime < 30
    },
    {
        id: 'feature_explorer',
        name: 'Feature Explorer',
        description: 'Interact with all features in a level',
        unlocked: false,
        icon: '🔍',
        condition: (state: GameState) => state.selectedFeatures.length === state.currentLevel + 4
    },
    {
        id: 'xai_master',
        name: 'XAI Master',
        description: 'Complete all levels with at least 90% accuracy',
        unlocked: false,
        icon: '🧠',
        condition: (state: GameState) => 
            state.completedLevels.length === 10 && 
            state.scores.every((score: Score) => score.score >= 90)
    }
];