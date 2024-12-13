import React from 'react';
import './BorderedText.scss';

type BorderedTextProps = {
  children: React.ReactNode;
};

const BorderedText: React.FC<BorderedTextProps> = ({ children }) => {
  return <div className="bordered-text-wrapper"><span>{children}</span></div>;
};

export default BorderedText;
