'use client';

import React from 'react';
import WeekCircle from '../weekCircle/WeekCircle';
import styles from './LifeStageBlock.module.css';

const LifeStageBlock = ({ title, weeks }) => {
  return (
    <div className={styles.stageBlock}>
      <h3>{title}</h3>
      <div className={styles.weekGrid}>
        {weeks.map((week) => (
          <WeekCircle
            key={week.id}
            isPast={week.isPast}
            startDate={week.startDate}
            endDate={week.endDate}
            averageMoodColor={week.averageMoodColor}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(LifeStageBlock);
