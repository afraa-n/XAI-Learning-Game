import React from 'react';

interface TutorialProps {
    onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
                <h2 className="text-2xl font-bold mb-4">Welcome to the XAI Puzzle Game</h2>
                <p className="mb-6">
                    In this game, you'll explore the world of Explainable AI (XAI) by making predictions and
                    understanding the key factors that influence the outcomes.
                </p>
                <p className="mb-6">
                    Your goal is to select the appropriate feature values to achieve the best prediction
                    accuracy. The SHAP visualization will help you understand how each feature contributes to
                    the prediction.
                </p>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={onClose}
                >
                    Got it, let's start!
                </button>
            </div>
        </div>
    );
};

export default Tutorial;