'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setWeekData, selectWeekData } from '../../redux/weekDetailsSlice'
import { format, addDays, parseISO, startOfWeek } from 'date-fns'
import { ru } from 'date-fns/locale'
import Spinner from '../Spinner/Spinner'
import { useRenderReady } from '../../hooks/useRenderReady'
import WeekDetailHeader from './WeekDetailHeader/WeekDetailHeader'
import WeekDetailGrid from './WeekDetailGrid/WeekDetailGrid'
import styles from './WeekDetail.module.css'

export default function WeekDetail({ startDate }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const stored = useSelector((state) => selectWeekData(state, startDate))
  const isReady = useRenderReady(true)

  const paramDate = parseISO(startDate)
  const monday = startOfWeek(paramDate, { locale: ru })
  const sunday = addDays(monday, 6)
  const weekKey = format(monday, 'yyyy-MM-dd')

  const createEmptyWeek = useCallback((mondayDate) => {
    const days = {}
    for (let i = 0; i < 7; i++) {
      const dateKey = format(addDays(mondayDate, i), 'yyyy-MM-dd')
      days[dateKey] = { note: '', mood: 3 }
    }
    return { days }
  }, [])

  const [week, setWeek] = useState(() => stored || createEmptyWeek(monday))

  useEffect(() => {
    if (stored) setWeek(stored)
  }, [stored])

  if (!isReady) {
    return (
      <div className={styles.weekDetail}>
        <Spinner strInfo={'неделю'} />
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
    router.push('/')
  }

  const handleCancel = () => {
    router.push('/')
  }

  const dateKeys = Array.from({ length: 7 }).map((_, i) =>
    format(addDays(monday, i), 'yyyy-MM-dd')
  )

  return (
    <div className={styles.weekDetail}>
      <WeekDetailHeader
        monday={monday}
        sunday={sunday}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <WeekDetailGrid dateKeys={dateKeys} week={week} onChange={handleChange} />
    </div>
  )
}
