import { FeatureExplanation } from '../types';

export function getPrediction(
  features: string[],
  values: number[],
  model: (features: number[]) => number
): { prediction: number; explanation: FeatureExplanation[] } {
  const prediction = model(values);

  // Compute simplified SHAP-like values
  const explanation: FeatureExplanation[] = features.map((feature, index) => {
    const baselineValue = model(values.map((v, i) => i === index ? 0 : v));
    const importance = prediction - baselineValue;
    return {
      feature,
      importance: Math.min(Math.max(importance, -1), 1), // Clamp importance between -1 and 1
      contribution: importance >= 0 ? 'Increases' : 'Decreases'
    };
  });

  return { prediction, explanation };
}