import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../components/Game';

describe('Game Component', () => {
    test('renders profile selection initially', () => {
        render(<Game />);
        expect(screen.getByText(/Choose Your XAI Guide/i)).toBeInTheDocument();
    });

    test('can select character and start game', () => {
        render(<Game />);
        const wizardCharacter = screen.getByText(/XAI Wizard/i);
        fireEvent.click(wizardCharacter);
        
        const nameInput = screen.getByPlaceholderText(/Enter your name/i);
        fireEvent.change(nameInput, { target: { value: 'Test Player' } });
        
        const startButton = screen.getByText(/Begin Your Journey/i);
        fireEvent.click(startButton);
        
        expect(screen.getByText(/Level 1/i)).toBeInTheDocument();
    });
});
