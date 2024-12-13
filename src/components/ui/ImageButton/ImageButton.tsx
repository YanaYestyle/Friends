import React from 'react';
import './ImageButton.scss';

type ImageButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
};

const ImageButton: React.FC<ImageButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  const imageButtonClass = `image-button image-button--${variant}`;

  return (
    <button className={imageButtonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default ImageButton;
