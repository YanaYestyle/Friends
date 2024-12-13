import React, { useState, ReactNode } from 'react';
import './Navs.scss';

type NavsProps = {
  items: string[];
  children: ReactNode[];
};

const Navs: React.FC<NavsProps> = ({ items, children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="navs-container">
      <div className="navs-header">
        {items.map((label, index) => (
          <button
            key={label}
            className={`nav-button ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleNavClick(index)}
          >
            {label}
          </button>
        ))}
      </div>
      {children[activeIndex]}
    </div>
  );
};

export default Navs;
