import React from 'react';
import { render } from '@testing-library/react';
import XAIVisualizer from '../components/XAIVisualizer';

describe('XAIVisualizer Component', () => {
    const mockData = [
        {
            feature: 'Test Feature',
            importance: 0.8,
            contribution: 'Increases' as const,
            value: 5
        }
    ];

    test('renders visualization with data', () => {
        const { getByText } = render(
            <XAIVisualizer data={mockData} theme="tech" />
        );
        expect(getByText(/Test Feature/i)).toBeInTheDocument();
        expect(getByText(/Feature Importance Analysis/i)).toBeInTheDocument();
    });
});