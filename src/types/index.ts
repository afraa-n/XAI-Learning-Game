export interface Feedback {
  title: string;
  message: string;
  score: number;
}

export interface GameState {
  gamePhase: 'profile' | 'map' | 'level' | 'complete';
  profile: {
    character: CharacterType;
    name: string;
    totalScore: number;
    unlockedLevels: number[];
    achievements: string[];
  } | null;
  currentLevel: number;
  selectedFeatures: number[];
  prediction: number | null;
  playerScore: number;
  explanation: FeatureExplanation[] | null;
  showTutorial: boolean;
  score: number;
  achievements: Achievement[];
  recentAchievement: Achievement | undefined;
  predictions: number[];
  scores: Array<{
    playerName: string;
    score: number;
  }>;
  lastLevelTime: number;
  modelPrediction: number | null;
  completedLevels: number[];
  unlockedLevels: number[];
  feedback: Feedback | null;
  numericalPrediction: string;
}

export interface FeatureExplanation {
  feature: string;
  importance: number;
  contribution: 'Increases' | 'Decreases';
}

export interface Level {
  id: number;
  title: string;
  description: string;
  story: string;
  features: Feature[];
  model: (features: number[]) => number;
  baselineScore: number;
  theme: GameTheme;
  difficulty: Difficulty;
  requiredScore: number;
  targetVariable: string;
  hints: string[];
}

export interface Feature {
  name: string;
  minValue: number;
  maxValue: number;
  format: (value: number) => string;
  weight: number;
}

export type GameTheme = 'tech' | 'medical' | 'environmental' | 'financial' | 'business' | 'entertainment';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
  condition: (state: GameState) => boolean;
}

export interface FeatureCardProps {
  feature: string;
  value?: number;
  onClick?: () => void;
  isSelected?: boolean;
  theme?: GameTheme;
  showSHAPValue?: boolean;
  shapValue?: number;
  formatValue?: (value: number) => string;
}

export interface LevelMapProps {
  levels: Level[];
  currentLevel: number;
  unlockedLevels: number[];
  onSelectLevel: (levelId: number) => void;
}

export interface Score {
  playerName: string;
  score: number;
}

export interface Character {
  name: string;
  description: string;
  imageUrl: string;
  dialogue: {
    intro: string;
    hint: string;
    success: string;
    failure?: string;
    levelComplete?: string;
  };
}

export type CharacterType = 'wizard' | 'robot' | 'scientist' | 'explorer';