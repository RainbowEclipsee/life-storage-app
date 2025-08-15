'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setWeekData, selectWeekData } from '../../redux/weekDetailsSlice';
import { format, addDays, parseISO, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import { useRenderReady } from '../../hooks/useRenderReady';
import styles from './WeekDetail.module.css';

const dayNames = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

export default function WeekDetail({ startDate }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const stored = useSelector((state) => selectWeekData(state, startDate));

  const isReady = useRenderReady(true);

  // Начало недели (понедельник) с учётом русской локали
  const paramDate = parseISO(startDate);
  const monday = startOfWeek(paramDate, { locale: ru });
  const sunday = addDays(monday, 6);
  const weekKey = format(monday, 'yyyy-MM-dd');

  const createEmptyWeek = useCallback((mondayDate) => {
    const days = {};
    for (let i = 0; i < 7; i++) {
      const dateKey = format(addDays(mondayDate, i), 'yyyy-MM-dd');
      days[dateKey] = { note: '', mood: 3 };
    }
    return { days };
  }, []);

  const [week, setWeek] = useState(() => (stored ? stored : createEmptyWeek(monday)));

  useEffect(() => {
    if (stored) setWeek(stored);
  }, [stored]);

  if (!isReady) {
    return (
      <div className={styles.weekDetail}>
        <Spinner strInfo={'неделю'} />
      </div>
    );
  }

  const handleChange = (date, field, value) => {
    setWeek((prev) => ({
      days: {
        ...prev.days,
        [date]: { ...prev.days[date], [field]: value },
      },
    }));
  };

  const handleSave = () => {
    dispatch(setWeekData({ startDate: weekKey, data: week }));
    router.push('/');
  };

  const handleCancel = () => {
    router.push('/');
  };

  const dateKeys = Array.from({ length: 7 }).map((_, i) => format(addDays(monday, i), 'yyyy-MM-dd'));

  return (
    <div className={styles.weekDetail}>
      <header className={styles.weekDetail__header}>
        <h1>
          Неделя{' '}
          <span className={styles.weekDetail__dates}>
            {format(monday, 'dd.MM.yyyy', { locale: ru })} – {format(sunday, 'dd.MM.yyyy', { locale: ru })}
          </span>
        </h1>
        <div className={styles.weekDetail__buttons}>
          <Button btnName="Сохранить" onClick={handleSave} />
          <Button btnName="Отменить" onClick={handleCancel} />
        </div>
      </header>

      <div className={styles.weekDetail__grid}>
        {dateKeys.map((date, idx) => {
          const data = week.days?.[date] ?? { note: '', mood: 3 };
          return (
            <div key={date} className={styles.dayCard}>
              <div className={styles.dayCard__header}>
                <span className={styles.dayCard__name}>{dayNames[idx]}</span>
                <span className={styles.dayCard__date}>
                  {format(parseISO(date), 'dd.MM', { locale: ru })}
                </span>
              </div>

              <textarea
                className={styles.dayCard__note}
                value={data.note}
                onChange={(e) => handleChange(date, 'note', e.target.value)}
                placeholder="Заметка..."
              />

              <div className={styles.dayCard__mood}>
                <label className={styles.moodLabel}>Настроение:</label>
                <select
                  className={styles.moodSelect}
                  value={data.mood}
                  onChange={(e) => handleChange(date, 'mood', Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
