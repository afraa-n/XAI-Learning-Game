import { FeatureExplanation } from '../types';

export function getExplanation(
  features: string[],
  values: number[],
  prediction: number
): FeatureExplanation[] {
  return features.map((feature, index) => {
    const value = values[index] * 0.1;
    const contribution: 'Increases' | 'Decreases' = value >= 0 ? 'Increases' : 'Decreases';
    return {
      feature,
      importance: Math.abs(value),
      contribution,
    };
  }).sort((a, b) => Math.abs(b.importance) - Math.abs(a.importance));
}