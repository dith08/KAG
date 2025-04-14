import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export const CardSlider: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {children}
    </div>
  );
};

export const CardSliderContent: React.FC<CardProps> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
