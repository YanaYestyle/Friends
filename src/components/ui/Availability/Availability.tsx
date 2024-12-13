import React from 'react';
import './Availability.scss';

type AvailabilityProps = {
  status: 'available' | 'not-available';
};

const Availability: React.FC<AvailabilityProps> = ({ status }) => {
  return <div className={`ellipse ${status}`}></div>;
};

export default Availability;
