import React from 'react';
import WeekDayCard from '../WeekDayCard/WeekDayCard';
import styles from './WeekDetailGrid.module.css';

const dayNames = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

export default function WeekDetailGrid({ dateKeys, week, onChange }) {
  return (
    <div className={styles.grid}>
      {dateKeys.map((date, idx) => {
        const data = week.days?.[date] ?? { note: '', mood: 3 };
        return (
          <WeekDayCard
            key={date}
            date={date}
            dayName={dayNames[idx]}
            note={data.note}
            mood={data.mood}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
}
