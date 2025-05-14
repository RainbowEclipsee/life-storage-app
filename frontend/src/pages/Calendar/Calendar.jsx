import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWeeks } from '../../store/lifeSlice'
import { generateWeeks } from '../../utils/generateWeeks'
import LifeStageBlock from '../../components/LifeStageBlock/LifeStageBlock'

const Celendar = () => {
  const dispatch = useDispatch()

  const { dateOfBirth, estimatedDeathDate, firstUsageDate } = useSelector((state) => state.profile)
  const { weeks } = useSelector((state) => state.life)

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

  // Группировка недель по стадиям жизни
  const grouped = weeks.reduce((acc, week) => {
    if (!acc[week.stage]) acc[week.stage] = []
    acc[week.stage].push(week)
    return acc
  }, {})

  return (
    <div className="life-calendar">
      {Object.entries(grouped).map(([stage, weeks]) => (
        <LifeStageBlock key={stage} title={stage} weeks={weeks} />
      ))}
    </div>
  )
}

export default Celendar
