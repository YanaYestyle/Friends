import React from 'react';
import './Button.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
}) => {
  const buttonClass = `button button--${variant} ${disabled ? 'button--disabled' : ''}`;

  return (
    <button className={buttonClass} onClick={disabled ? undefined : onClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
