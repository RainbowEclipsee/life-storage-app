'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRenderReady } from '../hooks/useRenderReady'

import { useDispatch, useSelector } from 'react-redux'
import { setWeeks } from '../redux/lifeSlice'
import { generateWeeks } from '../utils/generateWeeks'
import { getAverageMoodColor } from '../utils/getColorByMood'

import LifeStageBlock from '../components/LifeStageBlock/LifeStageBlock'
import Spinner from '../components/Spinner/Spinner'
import CalendarFilter from '../components/CalendarFilter/CalendarFilter'

const Calendar = () => {
  const { dateOfBirth, estimatedDeathDate, firstUsageDate } = useSelector(
    (state) => state.profile
  )
  const weeks = useSelector((state) => state.life.weeks)
  const weekDetails = useSelector((state) => state.weekDetails)

  const dispatch = useDispatch()

  const isReady = useRenderReady(weeks.length > 0)

  const highlightedRef = useRef(null)
  const [filterStatusMessage, setFilterStatusMessage] = useState(null)

  useEffect(() => {
    if (dateOfBirth && estimatedDeathDate && firstUsageDate) {
      const generated = generateWeeks({
        dateOfBirth,
        estimatedDeathDate,
        firstUsageDate,
      })
      dispatch(setWeeks(generated))
    }
  }, [dispatch, dateOfBirth, estimatedDeathDate, firstUsageDate])

  const grouped = useMemo(() => {
    return weeks.reduce((acc, week) => {
      const stage = week.stage
      if (!acc[stage]) acc[stage] = []

      const key = week.startDate.slice(0, 10)
      const weekData = weekDetails[key]
      const averageMoodColor = getAverageMoodColor(weekData)

      acc[stage].push({ ...week, averageMoodColor })
      return acc
    }, {})
  }, [weeks, weekDetails])

  const removeExistingHighlight = () => {
    const prev = document.querySelector('.week-dot--highlighted')
    if (prev) prev.classList.remove('week-dot--highlighted')
    highlightedRef.current = null
  }

  const applyHighlightToWeek = (weekStart) => {
    removeExistingHighlight()
    if (!weekStart) return

    const wrapper = document.querySelector(`[data-week="${weekStart}"]`)
    if (!wrapper) {
      highlightedRef.current = weekStart
      return false
    }
    const dot = wrapper.querySelector('.week-dot')
    if (dot) {
      dot.classList.add('week-dot--highlighted')
      highlightedRef.current = weekStart
      return true
    }
    highlightedRef.current = weekStart
    return false
  }

  const handleApplyWeek = (weekStart) => {
    if (!weekStart) {
      setFilterStatusMessage('Выберите корректную дату')
      return
    }
    if (!isReady) {
      setFilterStatusMessage('Данные ещё загружаются, повторите чуть позже')
      return
    }

    const found = weeks.some((w) => w.startDate === weekStart)
    if (!found) {
      removeExistingHighlight()
      setFilterStatusMessage('Неделя не найдена в календаре')
      return
    }

    const applied = applyHighlightToWeek(weekStart)
    setFilterStatusMessage(null)
    return applied
  }

  const handleClearFilter = () => {
    removeExistingHighlight()
    setFilterStatusMessage(null)
  }

  useEffect(() => {
    if (highlightedRef.current) {
      applyHighlightToWeek(highlightedRef.current)
    }
  }, [weeks.length])

  return (
    <div className="life-calendar">
      <CalendarFilter
        onApply={handleApplyWeek}
        onClear={handleClearFilter}
        statusMessage={filterStatusMessage}
      />

      {!isReady ? (
        <Spinner strInfo={'жизнь'} />
      ) : (
        Object.entries(grouped).map(([stage, weeks]) => (
          <LifeStageBlock key={stage} title={stage} weeks={weeks} />
        ))
      )}
    </div>
  )
}

export default React.memo(Calendar)
