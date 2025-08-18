import React from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Button from '../../Button/Button'
import styles from './WeekDetailHeader.module.css'

export default function WeekDetailHeader({ monday, sunday, onSave, onCancel }) {
  return (
    <header className={styles.header}>
      <h1>
        Неделя{' '}
        <span className={styles.dates}>
          {format(monday, 'dd.MM.yyyy', { locale: ru })} –{' '}
          {format(sunday, 'dd.MM.yyyy', { locale: ru })}
        </span>
      </h1>
      <div className={styles.buttons}>
        <Button btnName="Сохранить" onClick={onSave} />
        <Button btnName="Отменить" onClick={onCancel} />
      </div>
    </header>
  )
}
