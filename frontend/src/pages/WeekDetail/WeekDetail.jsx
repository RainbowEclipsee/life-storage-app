import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWeekData, selectWeekData } from '../../store/weekDetailsSlice'
import { format, addDays, parseISO } from 'date-fns'
import './WeekDetail.css'

const dayNames = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

export default function WeekDetail() {
  const { startDate } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const stored = useSelector((state) => selectWeekData(state, startDate))
  
  const [week, setWeek] = useState(() => {
    if (stored) return stored
    const days = {}
    for (let i = 0; i < 7; i++) {
      const date = format(addDays(parseISO(startDate), i), 'yyyy-MM-dd')
      days[date] = { note: '', mood: 3 }
    }
    return { days }
  })

  useEffect(() => {
    if (stored) setWeek(stored)
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
    if (stored) setWeek(stored)
    else {
      navigate('/')
    }
  }

  const monday = parseISO(startDate)
  const sunday = addDays(monday, 6)

  return (
    <div className="week-detail">
      <h1>Неделя {format(monday,'dd.MM.yyyy')} – {format(sunday,'dd.MM.yyyy')}</h1>
      <div className="week-grid">
        {Object.entries(week.days).map(([date, data], idx) => (
          <div key={date} className="day-card">
            <div className="day-header">
              <span>{dayNames[idx]}</span>
              <span>{format(parseISO(date),'dd.MM')}</span>
            </div>
            <textarea
              value={data.note}
              onChange={(e) => handleChange(date,'note',e.target.value)}
              placeholder="Заметка..."
            />
            <div className="mood-control">
              <label>Настроение:</label>
              <select
                value={data.mood}
                onChange={(e) => handleChange(date,'mood',Number(e.target.value))}
              >
                {[1,2,3,4,5].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className="btn-save" onClick={handleSave}>Сохранить</button>
        <button className="btn-cancel" onClick={handleCancel}>Отменить</button>
      </div>
    </div>
  )
}
