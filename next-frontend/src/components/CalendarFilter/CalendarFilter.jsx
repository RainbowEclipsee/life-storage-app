'use client'

import React, { useState } from 'react'
import { parseISO, startOfWeek, format } from 'date-fns'
import { ru } from 'date-fns/locale'
import styles from './CalendarFilter.module.css'

export default function CalendarFilter({
  onApply,
  onClear,
  statusMessage = null,
}) {
  const [dateValue, setDateValue] = useState('')

  const handleInputChange = (e) => setDateValue(e.target.value)

  const handleApply = () => {
    if (!dateValue) {
      onApply?.(null)
      return
    }
    try {
      const parsed = parseISO(dateValue)
      const monday = startOfWeek(parsed, { locale: ru })
      const weekStartKey = format(monday, 'yyyy-MM-dd')
      onApply?.(weekStartKey)
    } catch (err) {
      onApply?.(null)
    }
  }

  const handleClear = () => {
    setDateValue('')
    onClear?.()
  }

  return (
    <div className={styles.filter}>
      <label className={styles.label}>
        Найти неделю:
        <input
          type="date"
          className={styles.dateInput}
          value={dateValue}
          onChange={handleInputChange}
          aria-label="Выберите дату для поиска недели"
        />
      </label>

      <div className={styles.controls}>
        <button type="button" className={styles.applyBtn} onClick={handleApply}>
          Применить
        </button>
        <button type="button" className={styles.clearBtn} onClick={handleClear}>
          Очистить
        </button>
      </div>

      {statusMessage ? (
        <div role="status" className={styles.status}>
          {statusMessage}
        </div>
      ) : null}
    </div>
  )
}
