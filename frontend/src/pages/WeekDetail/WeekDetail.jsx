import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWeekData, selectWeekData } from '../../store/weekDetailsSlice'
import { format, addDays, parseISO, startOfWeek } from 'date-fns'
import { ru } from 'date-fns/locale'
import Button from '../../components/Button/Button'

import './WeekDetail.css'
import { useRenderReady } from '../../hooks/useRenderReady'
import Spinner from '../../components/Spinner/Spinner'

const dayNames = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

const WeekDetail = () => {
  const { startDate } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const stored = useSelector((state) => selectWeekData(state, startDate))

  const isReady = useRenderReady(true)

  // Начало недели (понедельник) с учётом русской локали
  const paramDate = parseISO(startDate)
  const monday = startOfWeek(paramDate, { locale: ru })
  const sunday = addDays(monday, 6)
  const weekKey = format(monday, 'yyyy-MM-dd')

  const [week, setWeek] = useState(() => {
    if (stored) return stored
    const days = {}
    for (let i = 0; i < 7; i++) {
      const dateKey = format(addDays(monday, i), 'yyyy-MM-dd')
      days[dateKey] = { note: '', mood: 3 }
    }
    return { days }
  })

  useEffect(() => {
    if (stored) setWeek(stored)
  }, [stored])

  if(!isReady){
    return(
      <div>
        <Spinner strInfo={'неделю'}/>
      </div>
    )
  }

  const handleChange = (date, field, value) => {
    setWeek((prev) => ({
      days: {
        ...prev.days,
        [date]: { ...prev.days[date], [field]: value },
      },
    }))
  }

  const handleSave = () => {
    dispatch(setWeekData({ startDate: weekKey, data: week }))
    navigate('/')
  }

  const handleCancel = () => navigate('/')

  return (
    <div className="week-detail">
      <header className="week-detail__header">
        <h1>Неделя{' '}
          <span className="week-detail__dates">
            {format(monday, 'dd.MM.yyyy', { locale: ru })} – {format(sunday, 'dd.MM.yyyy', { locale: ru })}
          </span>
        </h1>
        <div className="week-detail__buttons">
          <Button btnName="Сохранить" onClick={handleSave} />
          <Button btnName="Отменить" onClick={handleCancel} />
        </div>
      </header>

      <div className="week-detail__grid">
        {Object.entries(week.days).map(([date, data], idx) => (
          <div key={date} className="day-card">
            <div className="day-card__header">
              <span className="day-card__name">{dayNames[idx]}</span>
              <span className="day-card__date">
                {format(parseISO(date), 'dd.MM', { locale: ru })}
              </span>
            </div>
            <textarea
              className="day-card__note"
              value={data.note}
              onChange={(e) => handleChange(date, 'note', e.target.value)}
              placeholder="Заметка..."
            />
            <div className="day-card__mood">
              <label className="mood-label">Настроение:</label>
              <select
                className="mood-select"
                value={data.mood}
                onChange={(e) => handleChange(date, 'mood', Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(WeekDetail)
