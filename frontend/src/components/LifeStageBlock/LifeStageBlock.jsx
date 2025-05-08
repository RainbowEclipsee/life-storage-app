import React from 'react';
import WeekCircle from '../WeekCircle/WeekCircle';
import './LifeStageBlock.css';

const LifeStageBlock = ({ title, weeks }) => {
  return (
    <div className="stage-block">
      <h3>{title}</h3>
      <div className="week-grid">
        {weeks.map((week) => (
          <WeekCircle key={week.id} isPast={week.isPast} />
        ))}
      </div>
    </div>
  );
};

export default LifeStageBlock;
