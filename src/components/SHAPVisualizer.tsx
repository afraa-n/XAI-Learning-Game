import React from 'react';
import { FeatureExplanation, GameTheme, Feedback } from '../types';

interface SHAPVisualizerProps {
  data: FeatureExplanation[];
  theme: GameTheme;
  targetVariable: string;
  prediction: number;
  feedback?: Feedback;
  accuracy: number;
}

const SHAPVisualizer: React.FC<SHAPVisualizerProps> = ({
  data,
  theme,
  targetVariable,
  prediction,
  feedback,
  accuracy
}) => {
  const sortedData = [...data].sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance));

  const getAccuracyColor = (acc: number) => {
    if (acc >= 90) return 'text-green-600';
    if (acc >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="mb-6 border-b pb-4">
        <h3 className="text-2xl font-bold">{feedback?.title || 'Your Decision'}</h3>
        <div className="mt-2 space-y-2">
          <p className="text-lg">{feedback?.message}</p>
          <p className={`text-lg font-semibold ${getAccuracyColor(accuracy)}`}>
            Accuracy: {accuracy}%
          </p>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-4">Feature Impact Analysis</h3>
      <div className="space-y-4">
        {sortedData.map((feature, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{feature.feature}</span>
              <span className={`font-medium ${feature.importance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(feature.importance).toFixed(2)}
              </span>
            </div>
            <div className="relative h-4 bg-gray-200 rounded">
              <div
                className={`absolute h-full rounded ${
                  feature.importance >= 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{
                  width: `${Math.min(Math.abs(feature.importance * 100), 100)}%`,
                  left: feature.importance < 0 ? 'auto' : '50%',
                  right: feature.importance < 0 ? '50%' : 'auto'
                }}
              />
              <div className="absolute w-px h-full bg-gray-400 left-1/2" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">How to Interpret:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Features on the right (green) support the prediction</li>
          <li>• Features on the left (red) oppose the prediction</li>
          <li>• Bar length shows the strength of the feature's impact</li>
          <li>• Values are normalized between -1 and 1 for comparison</li>
        </ul>
      </div>

      <div className="mt-4 flex justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-2" />
          <span>Supports Prediction</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-2" />
          <span>Opposes Prediction</span>
        </div>
      </div>
    </div>
  );
};

export default SHAPVisualizer;