import { explainPrediction } from '../../utils/xaiExplainer';

describe('XAI Explainer', () => {
    test('calculates feature importance correctly', () => {
        const features = ['Feature1', 'Feature2'];
        const values = [5, 3];
        const prediction = 80;

        const result = explainPrediction(features, values, prediction);
        
        expect(result.prediction).toBe(prediction);
        expect(result.topFeatures).toHaveLength(2);
        expect(result.topFeatures[0].importance).toBeGreaterThan(result.topFeatures[1].importance);
    });
});