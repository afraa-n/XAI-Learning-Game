export interface Profile {
    id: string;
    name: string;
    character: 'wizard' | 'robot' | 'scientist' | 'explorer';
    avatar: string;
    level: number;
    totalScore: number;
    unlockedLevels: number[];
  }
  
  export const CHARACTERS = {
    wizard: {
      name: 'XAI Wizard',
      description: 'Master of AI explanations',
      avatar: '🧙‍♂️',
      dialogue: {
        intro: "Welcome, seeker of AI knowledge!",
        hint: "Consider how each feature weaves into the prediction spell...",
        success: "Magnificent! The patterns reveal themselves!",
      }
    },
    robot: {
      name: 'Logic Bot',
      description: 'Precision in predictions',
      avatar: '🤖',
      dialogue: {
        intro: "Initializing AI learning sequence...",
        hint: "Analyzing feature correlations...",
        success: "Optimal solution achieved!",
      }
    },
    scientist: {
      name: 'Data Scientist',
      description: 'Expert in analysis',
      avatar: '👩‍🔬',
      dialogue: {
        intro: "Let's explore this hypothesis!",
        hint: "The data suggests a pattern here...",
        success: "Excellent experimental results!",
      }
    },
    explorer: {
      name: 'AI Explorer',
      description: 'Adventurer in AI realms',
      avatar: '🗺️',
      dialogue: {
        intro: "Ready to explore AI mysteries?",
        hint: "This path looks promising...",
        success: "Another discovery made!",
      }
    }
  };