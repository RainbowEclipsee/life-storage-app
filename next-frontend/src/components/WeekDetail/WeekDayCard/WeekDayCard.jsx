import React from 'react'
import { parseISO, format } from 'date-fns'
import { ru } from 'date-fns/locale'
import styles from './WeekDayCard.module.css'

export default function WeekDayCard({ date, dayName, note, mood, onChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>{dayName}</span>
        <span>
          {format(parseISO(date), 'dd.MM', { locale: ru })}
        </span>
      </div>

      <textarea
        className={styles.note}
        value={note}
        onChange={(e) => onChange(date, 'note', e.target.value)}
        placeholder="Заметка..."
      />

      <div className={styles.mood}>
        <label className={styles.moodLabel}>Настроение:</label>
        <select
          className={styles.moodSelect}
          value={mood}
          onChange={(e) => onChange(date, 'mood', Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
