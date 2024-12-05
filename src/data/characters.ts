import { Character } from '../types';

export const CHARACTERS: Record<string, Character> = {
    wizard: {
        name: 'XAI Wizard',
        description: 'Master of AI explanations',
        imageUrl: '/assets/images/characters/wizard.png',
        dialogue: {
            intro: "Welcome to the world of Explainable AI!",
            hint: "Consider how each feature influences the prediction...",
            success: "Excellent work! The patterns become clear!",
            failure: "Let's try a different approach...",
            levelComplete: "You've mastered this challenge!"
        }
    },
    robot: {
        name: 'Logic Bot',
        description: 'Precision in predictions',
        imageUrl: '/assets/images/characters/robot.png',
        dialogue: {
            intro: "Initializing learning sequence...",
            hint: "Analyzing feature correlations...",
            success: "Optimal solution achieved!",
            failure: "Recalculating approach...",
            levelComplete: "Mission accomplished!"
        }
    },
    scientist: {
        name: 'Duke Scientist',
        description: 'Expert in pattern recognition',
        imageUrl: '/assets/images/characters/scientist.png',
        dialogue: {
            intro: "Let's analyze this fascinating dataset!",
            hint: "The data suggests an interesting pattern here...",
            success: "Our hypothesis was correct!",
            failure: "This requires further investigation...",
            levelComplete: "Another breakthrough discovery!"
        }
    },
    explorer: {
        name: 'AI Explorer',
        description: 'Adventurer in the AI wilderness',
        imageUrl: '/assets/images/characters/explorer.png',
        dialogue: {
            intro: "Ready to explore the AI frontier?",
            hint: "I sense we're on the right track...",
            success: "A remarkable discovery!",
            failure: "Every setback leads to new paths...",
            levelComplete: "Another territory mapped!"
        }
    }
};