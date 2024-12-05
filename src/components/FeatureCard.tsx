import React from 'react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  value,
  onClick,
  isSelected,
  theme,
  showSHAPValue,
  shapValue,
  formatValue
}) => {
  const displayValue = value !== undefined && formatValue 
    ? formatValue(value) 
    : 'Click to select';

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md p-6 cursor-pointer
        transition-all duration-300
        ${isSelected ? 'ring-4 ring-blue-400 transform scale-105' : 'hover:bg-gray-100 hover:shadow-lg'}
        ${theme === 'tech' ? 'border-t-4 border-blue-500' : ''}
        ${theme === 'medical' ? 'border-t-4 border-green-500' : ''}
        ${theme === 'environmental' ? 'border-t-4 border-yellow-500' : ''}
        ${theme === 'financial' ? 'border-t-4 border-purple-500' : ''}
        ${theme === 'business' ? 'border-t-4 border-indigo-500' : ''}
        ${theme === 'entertainment' ? 'border-t-4 border-pink-500' : ''}
      `}
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-2">{feature}</h3>
      <div className="text-gray-600 font-medium mb-4">{displayValue}</div>
      {showSHAPValue && shapValue !== undefined && (
        <div className={`mb-2 ${shapValue >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
          Impact: {shapValue.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default FeatureCard;