import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWeekData, selectWeekData } from '../../store/weekDetailsSlice'
import { format, addDays, parseISO } from 'date-fns'
import Button from '../../components/Button/Button'

import './WeekDetail.css'


const dayNames = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

const WeekDetail = () => {
  const { startDate } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const stored = useSelector((state) => selectWeekData(state, startDate))

  const [week, setWeek] = useState(() => {
    if (stored) 
      return stored
    const days = {}
    for (let i = 0; i < 7; i++) {
      const date = format(addDays(parseISO(startDate), i), 'yyyy-MM-dd')
      days[date] = { note: '', mood: 3 }
    }
    return { days }
  })

  useEffect(() => {
    if (stored) {
      setWeek(stored)
    }
  }, [stored])

  const handleChange = (date, field, value) => {
    setWeek((w) => ({
      days: {
        ...w.days,
        [date]: {
          ...w.days[date],
          [field]: value,
        },
      },
    }))
  }

  const handleSave = () => {
    dispatch(setWeekData({ startDate, data: week }))
    navigate('/')
  }

  const handleCancel = () => {
    navigate('/')
  }

  const monday = parseISO(startDate)
  const sunday = addDays(monday, 6)

  return (
    <div className="week-detail">
      <header className="week-detail__header">
        <h1>
          Неделя{' '}
          <span className="week-detail__dates">
            {format(monday,'dd.MM.yyyy')} – {format(sunday,'dd.MM.yyyy')}
          </span>
        </h1>
        <div className="week-detail__buttons">
          <Button btnName="Сохранить" onClick={handleSave}/>
          <Button btnName="Отменить" onClick={handleCancel}/>
        </div>
      </header>

      <div className="week-detail__grid">
        {Object.entries(week.days).map(([date, data], idx) => (
          <div key={date} className="day-card">
            <div className="day-card__header">
              <span className="day-card__name">{dayNames[idx]}</span>
              <span className="day-card__date">{format(parseISO(date),'dd.MM')}</span>
            </div>
            <textarea
              className="day-card__note"
              value={data.note}
              onChange={(e) => handleChange(date,'note',e.target.value)}
              placeholder="Заметка..."
            />
            <div className="day-card__mood">
              <label className="mood-label">Настроение:</label>
              <select
                className="mood-select"
                value={data.mood}
                onChange={(e) => handleChange(date,'mood',Number(e.target.value))}
              >
                {[1,2,3,4,5].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeekDetail
