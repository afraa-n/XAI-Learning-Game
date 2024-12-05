import React, { useState, useEffect } from 'react';
import { Level, GameState, FeatureExplanation, Feedback, CharacterType, GameTheme, Feature } from '../types';
import LEVELS from '../data/levels';
import FeatureCard from './FeatureCard';
import LevelMap from './LevelMap';
import ProfileSelector from './ProfileSelector';
import { playSound } from '../utils/soundManager';

// Type definitions
type SHAPVisualizerProps = {
  data: FeatureExplanation[];
  theme: GameTheme;
  targetVariable: string;
  prediction: number;
  modelPrediction: number;
  feedback: Feedback;
};

const Game: React.FC = () => {
  // State initialization
  const [state, setState] = useState<GameState>({
    gamePhase: 'profile',
    profile: null,
    currentLevel: 0,
    selectedFeatures: [],
    prediction: null,
    modelPrediction: null,
    explanation: null,
    showTutorial: true,
    score: 0,
    playerScore: 0,
    achievements: [],
    recentAchievement: undefined,
    predictions: [],
    scores: [],
    lastLevelTime: 0,
    completedLevels: [],
    unlockedLevels: [1],
    feedback: null,
    numericalPrediction: '',
  });

  const [currentLevelData, setCurrentLevelData] = useState<Level>(LEVELS[0]);

  // Effects
  useEffect(() => {
    if (LEVELS[state.currentLevel]) {
      setCurrentLevelData(LEVELS[state.currentLevel]);
    } else {
      setState(prev => ({
        ...prev,
        gamePhase: 'map',
        currentLevel: 0
      }));
    }
  }, [state.currentLevel]);

  // Helper functions
  const getShapInterpretation = (value: number, feature: string): string => {
    const absValue = Math.abs(value);
    let strength: string;
    if (absValue > 0.66) strength = "Strong";
    else if (absValue > 0.33) strength = "Moderate";
    else strength = "Weak";

    return `${strength} ${value >= 0 ? 'positive' : 'negative'} impact`;
  };

  const formatPredictionValue = (value: number, targetVariable: string): string => {
    switch (targetVariable) {
      case 'Loan Approval':
        return value === 1 ? 'Approve' : 'Reject';
      case 'Risk Level':
        return value === 1 ? 'High Risk' : 'Low Risk';  
      case 'House Price':
        return `$${value.toLocaleString()}`;
      case 'Energy Consumption':
        return `${value} kWh`;
      case 'Crop Yield':
        return `${value} kg/ha`;    
      case 'Days to Complete':
        return `${value} days`;
      case 'Project Risk':  
        return value === 1 ? 'High Risk' : 'Low Risk';
      case 'Customer Churn':
        return value === 1 ? 'Likely to Churn' : 'Likely to Stay';
      case 'Marketing Response': 
        return value === 1 ? 'Will Respond' : 'Won\'t Respond';
      case 'Engagement Score':
        return `${value} points`;
      default:
        return value.toString();
    }
  };

  const getFeatureInterpretation = (feature: string, value: number): string => {
    switch (feature) {
      case 'Annual Income':
        return value >= 0 
          ? "Higher income increases approval chances"
          : "Lower income decreases approval chances";
      case 'Credit Score':
        return value >= 0 
          ? "Better credit score supports approval"
          : "Lower credit score suggests higher risk";
      case 'Debt-to-Income Ratio':
        return value >= 0 
          ? "Higher debt ratio increases risk"  
          : "Lower debt ratio favors approval";
      case 'Employment Status':
        return value >= 0 
          ? "Stable employment supports approval"
          : "Employment status raises concerns";
      case 'Project Budget':  
        return value >= 0
          ? "Higher budget reduces risk"
          : "Lower budget increases risk"; 
      case 'Team Size':
        return value >= 0
          ? "Larger team reduces completion time" 
          : "Smaller team extends completion time";
      case 'Customer Age':
        return value >= 0 
          ? "Longer customer relationship reduces churn risk"
          : "Newer customers have higher churn risk";
      case 'Usage Frequency':
        return value >= 0
          ? "Higher usage indicates engagement"
          : "Lower usage suggests disengagement";  
      case 'Response History':
        return value >= 0
          ? "Previous responses indicate likelihood"
          : "Lack of response history suggests lower chance";
      default:
        return value >= 0 
          ? "This factor has a positive impact" 
          : "This factor has a negative impact";
    }
  };

  const calculateSHAPValues = (
    features: number[], 
    model: (features: number[]) => number,
    levelFeatures: Feature[]
  ): FeatureExplanation[] => {
    const baselineFeatures = features.map(() => 0);
    const baselinePrediction = model(baselineFeatures);
    const currentPrediction = model(features);

    return levelFeatures.map((feature, index) => {
      const modifiedFeatures = [...features];
      modifiedFeatures[index] = baselineFeatures[index];
      const modifiedPrediction = model(modifiedFeatures);
      return {
        feature: feature.name,
        importance: currentPrediction - modifiedPrediction,
        contribution: currentPrediction - modifiedPrediction >= 0 ? 'Increases' : 'Decreases',
      };
    });
  };

  const calculateAccuracy = (prediction: number, target: number): number => {
    if (typeof target === 'boolean' || target === 0 || target === 1) {
      return prediction === target ? 100 : 0;
    }
    const percentDiff = Math.abs((prediction - target) / target);
    return Math.max(0, Math.round(100 * (1 - percentDiff)));
  };

  const getFeedbackMessage = (accuracy: number): string => {
    if (accuracy >= 90) {
      return 'Excellent prediction! You have shown a great understanding of the factors involved.';
    } else if (accuracy >= 70) {
      return 'Good prediction, but there is room for improvement. Consider the relative importance of each factor.';
    } else {
      return 'Your prediction differed significantly. Review the feature importance to understand why.';
    }
  };

  const handleFeatureClick = (index: number) => {
    const newSelectedFeatures = [...state.selectedFeatures];
    newSelectedFeatures[index] = Math.floor(
      Math.random() * 
      (currentLevelData.features[index].maxValue - currentLevelData.features[index].minValue + 1)
    ) + currentLevelData.features[index].minValue;

    setState((prev: GameState) => ({
      ...prev,
      selectedFeatures: newSelectedFeatures,
    }));
  };

  const handlePredictionSubmit = (userPrediction: number) => {
    if (state.selectedFeatures.length !== currentLevelData.features.length) {
      alert('Please select values for all features before making a prediction');
      return;
    }

    playSound('click');
    const modelPrediction = currentLevelData.model(state.selectedFeatures);
    const featureImportance = calculateSHAPValues(
      state.selectedFeatures,
      currentLevelData.model,
      currentLevelData.features
    );
    const accuracy = calculateAccuracy(userPrediction, modelPrediction);

    const feedback: Feedback = {
      title: 'Your Prediction',
      message: getFeedbackMessage(accuracy),
      score: accuracy,
    };

    setState((prev: GameState) => ({
      ...prev,
      prediction: userPrediction,
      modelPrediction,
      explanation: featureImportance,
      playerScore: prev.playerScore + accuracy,
      predictions: [...prev.predictions, userPrediction],
      scores: [...prev.scores, { playerName: prev.profile?.name || 'Unknown', score: accuracy }],
      feedback,
    }));  
  };

  const handleNextLevel = () => {
    setState((prev: GameState) => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
      gamePhase: 'level',
      selectedFeatures: [],
      prediction: null,
      modelPrediction: null,
      explanation: null,
      numericalPrediction: '',
      showTutorial: true,
    }));
  };

  const getDecisionButtons = () => {
    const allFeaturesSelected =
      state.selectedFeatures.filter((f: number | undefined): f is number => f !== undefined).length ===
      currentLevelData.features.length;
    const buttonStyle = 'px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300';
    const enabledButtonClass = 'bg-blue-500 hover:bg-blue-600';
    const disabledButtonClass = 'bg-gray-400';
    const baseButtonClass = `${buttonStyle} text-white`;

    switch (currentLevelData.targetVariable) {
      case 'Loan Approval':
        return (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-red-500 hover:bg-red-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(0)}
              disabled={!allFeaturesSelected}
            >
              Reject Loan
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-green-500 hover:bg-green-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(1)}
              disabled={!allFeaturesSelected}
            >
              Approve Loan
            </button>
          </div>
        );

      case 'Risk Level':
      case 'Project Risk':
        return (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-green-500 hover:bg-green-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(0)}
              disabled={!allFeaturesSelected}
            >
              Low Risk
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-red-500 hover:bg-red-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(1)}
              disabled={!allFeaturesSelected}
            >
              High Risk
            </button>
          </div>
        );

      case 'Customer Churn':
        return (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-green-500 hover:bg-green-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(0)}
              disabled={!allFeaturesSelected}
            >
              Will Stay
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-red-500 hover:bg-red-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(1)}
              disabled={!allFeaturesSelected}
            >
              Will Churn
            </button>
          </div>
        );

      case 'House Price':
        return (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-green-500 hover:bg-green-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(300000)}
              disabled={!allFeaturesSelected}
            >
              Below Market ($300K)
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-yellow-500 hover:bg-yellow-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(500000)}
              disabled={!allFeaturesSelected}  
            >
              Market Value ($500K)
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-red-500 hover:bg-red-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(700000)}
              disabled={!allFeaturesSelected}
            >
              Above Market ($700K)
            </button>
          </div>
        );

      case 'Energy Consumption':
        return (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-green-500 hover:bg-green-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(500)}
              disabled={!allFeaturesSelected}
            >
              Low (500 kWh)
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-yellow-500 hover:bg-yellow-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(1000)}
              disabled={!allFeaturesSelected}  
            >
              Medium (1000 kWh)
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-red-500 hover:bg-red-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(1500)}
              disabled={!allFeaturesSelected}
            >
              High (1500 kWh)
            </button>
          </div>
        );

      case 'Days to Complete':
        return (
          <div className="mt-8 flex justify-center space-x-4">  
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-green-500 hover:bg-green-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(30)}
              disabled={!allFeaturesSelected}
            >
              Fast (30 days)
            </button>
            <button 
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-yellow-500 hover:bg-yellow-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(60)}
              disabled={!allFeaturesSelected}
            >
              Average (60 days)  
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-red-500 hover:bg-red-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(90)}
              disabled={!allFeaturesSelected}
            >
              Slow (90 days)
            </button>
          </div>
        );

      case 'Crop Yield':
        return (
          <div className="mt-8 flex justify-center space-x-4">
<button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-red-500 hover:bg-red-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(5000)}
              disabled={!allFeaturesSelected} 
            >
              Low (5000 kg/ha)
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-yellow-500 hover:bg-yellow-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(7500)}
              disabled={!allFeaturesSelected}
            >
              Medium (7500 kg/ha)
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-green-500 hover:bg-green-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(10000)}
              disabled={!allFeaturesSelected}
            >
              High (10000 kg/ha)  
            </button>
          </div>
        );

      case 'Marketing Response':  
        return (
          <div className="mt-8 flex justify-center space-x-4">
            <button  
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-red-500 hover:bg-red-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(0)}
              disabled={!allFeaturesSelected}
            >
              Won't Respond
            </button>
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-green-500 hover:bg-green-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(1)}
              disabled={!allFeaturesSelected}
            >
              Will Respond
            </button>
          </div>
        );
        
      case 'Engagement Score':
        return ( 
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-red-500 hover:bg-red-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(20)}
              disabled={!allFeaturesSelected}
            >
              Low (20 points)
            </button>
            <button  
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-yellow-500 hover:bg-yellow-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(50)} 
              disabled={!allFeaturesSelected}
            >
              Medium (50 points)
            </button>
            <button  
              className={`${baseButtonClass} ${allFeaturesSelected ? 'bg-green-500 hover:bg-green-600' : disabledButtonClass}`}
              onClick={() => handlePredictionSubmit(80)}
              disabled={!allFeaturesSelected} 
            >
              High (80 points)
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  const SHAPVisualizer: React.FC<SHAPVisualizerProps> = ({
    data,
    theme,
    targetVariable,
    prediction,
    modelPrediction,
    feedback,
  }) => {
    const sortedData = [...data].sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance));
  
    return (
      <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-xl">  
        <h4 className="text-lg font-semibold text-gray-200 mb-4">Feature Impact Analysis</h4>
        
        <div className="flex items-center mb-4">
          <div className="text-sm font-semibold text-gray-400 mr-4">
            Your Prediction:
          </div>
          <div className="text-lg font-semibold text-blue-400">
            {formatPredictionValue(prediction, targetVariable)}
          </div>
          
          <div className="text-sm font-semibold text-gray-400 ml-8 mr-4">
            Model Prediction:
          </div>
          <div className="text-lg font-semibold text-blue-400">
            {formatPredictionValue(modelPrediction, targetVariable)}  
          </div>
        </div>

        <div className="space-y-6">
          {sortedData.map((feature, index) => {
            const widthPercent = Math.abs(feature.importance) * 100;
            const barWidth = Math.min(widthPercent, 50); // Limit bar width to 50%
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-200 font-medium">{feature.feature}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    feature.importance >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {feature.importance.toFixed(3)}
                  </span>
                </div>

                <div className="relative h-8">
                  {/* Center line */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-px h-full bg-gray-600" />
                  </div>
                  
                  {/* Impact bar */}
                  <div
                  className={`absolute top-0 h-full transition-all duration-500 ${
                    feature.importance >= 0 ? 'bg-emerald-500 left-1/2' : 'bg-rose-500 right-1/2'
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>

                <p className="text-sm text-gray-400 mt-1">
                  {getFeatureInterpretation(feature.feature, feature.importance)}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 flex justify-between text-sm text-gray-300">
          <span>← Decreases {targetVariable}</span>
          <span>Increases {targetVariable} →</span>
        </div>

        <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-200 mb-2">How to interpret:</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Bars extending right (green) show features supporting the prediction</li>
            <li>• Bars extending left (red) show features opposing the prediction</li>
            <li>• Longer bars indicate stronger impact on the decision</li>
            <li>• The value shows the relative strength of impact</li>
          </ul>
        </div>
      </div>
    );
  };

  const handleProfileSelect = (character: CharacterType, name: string) => {
    playSound('click');
    setState((prev: GameState) => ({
      ...prev,
      profile: {
        character,
        name,
        totalScore: 0,
        unlockedLevels: [1],
        achievements: [],
      },
      gamePhase: 'map',
    }));
  };

  const handleLevelSelect = (levelId: number) => {
    playSound('click');
    setState((prev: GameState) => ({
      ...prev,
      currentLevel: levelId - 1,
      gamePhase: 'level',
      selectedFeatures: [],
      prediction: null,
      modelPrediction: null,
      explanation: null,
      numericalPrediction: '',
      showTutorial: true,
    }));
  };

  // Rendering functions
  const renderLevel = () => {
    if (!currentLevelData) {
      return <div className="text-white text-center">Loading level...</div>;
    }

    return (
      <div className="p-8 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold mb-4 text-white">{currentLevelData.title}</h2>
        <p className="mb-4 text-gray-200 text-lg">{currentLevelData.description}</p>
        <p className="text-gray-200 text-lg mb-8">{currentLevelData.story}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentLevelData.features.map((feature, index) => (
            <div 
              key={index}
              className={`
                p-6 rounded-lg shadow-lg transition-all duration-300
                ${state.selectedFeatures[index] !== undefined 
                  ? 'bg-blue-600 bg-opacity-20 border border-blue-400' 
                  : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
                }
              `}
              onClick={() => handleFeatureClick(index)}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
                {state.selectedFeatures[index] !== undefined && (
                  <span className="px-3 py-1 bg-blue-500 rounded-full text-white text-sm">
                    Selected
                  </span>
                )}
              </div>

              <div className="text-3xl font-bold text-white mb-2">
                {state.selectedFeatures[index] !== undefined 
                  ? feature.format 
                    ? feature.format(state.selectedFeatures[index])
                    : state.selectedFeatures[index]
                  : '???'
                }
              </div>

              {state.explanation && state.explanation[index] && (
                <div className={`mt-4 text-sm ${
                  state.explanation[index].importance >= 0 
                    ? 'text-emerald-400' 
                    : 'text-rose-400'
                }`}>
                  {getShapInterpretation(state.explanation[index].importance, feature.name)}
                </div>
              )}

              <div className="mt-2 text-gray-300 text-sm">
                Click to generate value
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {getDecisionButtons()}
          {state.feedback && state.currentLevel < LEVELS.length - 1 && (
            <button
              className="px-6 py-3 rounded-lg font-semibold shadow-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
              onClick={handleNextLevel}
            >
              Next Level
            </button>
          )}
          {state.feedback && state.currentLevel === LEVELS.length - 1 && (
            <button
              className="px-6 py-3 rounded-lg font-semibold shadow-lg bg-green-500 hover:bg-green-600 text-white transition duration-300"
              onClick={() => setState(prev => ({ ...prev, gamePhase: 'complete' }))}
            >
              Complete Game
            </button>
          )}
        </div>

        {state.prediction !== null && state.modelPrediction !== null && state.explanation && state.feedback && (
          <div className="mt-8">
            <div className="bg-gray-700 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">Prediction Analysis</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-lg text-gray-300">{getFeedbackMessage(state.feedback.score)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-200">Your Prediction</h4>
                    <p className="text-gray-300">
                      {formatPredictionValue(state.prediction, currentLevelData.targetVariable)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-200">Model Prediction</h4>
                    <p className="text-gray-300">
                      {formatPredictionValue(state.modelPrediction, currentLevelData.targetVariable)}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-200">Current Score</h4>
                  <p className="text-2xl font-bold text-blue-400">{state.playerScore} points</p>
                </div>
              </div>
            </div>

            <SHAPVisualizer
              data={state.explanation}
              theme={currentLevelData.theme} 
              targetVariable={currentLevelData.targetVariable}
              prediction={state.prediction}
              modelPrediction={state.modelPrediction}
              feedback={state.feedback}
            />
          </div>
        )}
      </div>
    );
  };

  const renderGameComplete = () => (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6">Game Complete!</h2>
        
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-blue-400 mb-2">
              {state.playerScore} points
            </p>
            <p className="text-xl text-gray-300">Final Score</p>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Performance Analysis</h3>
          <p className="text-gray-200">
            {state.playerScore > 800 
              ? "Outstanding! You've mastered the understanding of feature importance and how models make decisions."
              : state.playerScore > 500
              ? "Great job! You've shown strong comprehension of how different factors influence predictions." 
              : "Good start! Keep exploring to better understand how features affect model decisions."}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setState(prev => ({ ...prev, gamePhase: 'map' }))}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300"
          >
            Return to Map
          </button>
        </div>
      </div>
    </div>
  );

  const renderMap = () => (
    <LevelMap
      levels={LEVELS}
      currentLevel={state.currentLevel}
      unlockedLevels={state.unlockedLevels}
      onSelectLevel={handleLevelSelect}
    />
  );

  const renderProfile = () => (
    <ProfileSelector 
      onSelect={handleProfileSelect}
      CharacterAvatar={{
        wizard: require('../assets/images/characters/wizard.png'),
        robot: require('../assets/images/characters/robot.png'),
        scientist: require('../assets/images/characters/scientist.png'),
        explorer: require('../assets/images/characters/explorer.png'),
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {state.profile && (
          <div className="mb-6 flex justify-between items-center">
            <div className="text-white">
              <span className="text-xl font-bold">{state.profile.name}</span>
              <span className="ml-4">Score: {state.playerScore}</span>
            </div>
            {state.gamePhase === 'level' && (
              <button
                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                onClick={() => setState(prev => ({ ...prev, gamePhase: 'map' }))}
              >
                Back to Map
              </button>
            )}
          </div>
        )}
        {state.gamePhase === 'profile' && renderProfile()}
        {state.gamePhase === 'map' && renderMap()}
        {state.gamePhase === 'level' && renderLevel()}
        {state.gamePhase === 'complete' && renderGameComplete()}
      </div>
    </div>
  );
};

export default Game;