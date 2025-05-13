import React from 'react';
import './WeekCircle.css';

const WeekCircle = ({ isPast }) => {
  return (
    <div
      className="week-circle"
      style={{
        backgroundColor: isPast ? '#555' : '#ddd',
      }}
    />
  );
};

export default WeekCircle;
