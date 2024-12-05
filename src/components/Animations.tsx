import React from 'react';

export const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="animate-fadeIn">{children}</div>
);

export const SlideIn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="animate-slideIn">{children}</div>
);

export const Bounce: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="animate-bounce">{children}</div>
);

export const Pulse: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="animate-pulse">{children}</div>
);