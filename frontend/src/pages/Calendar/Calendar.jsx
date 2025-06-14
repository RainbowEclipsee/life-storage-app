import React, { useEffect, useMemo } from 'react'
import { useRenderReady } from '../../hooks/useRenderReady'

import { useDispatch, useSelector } from 'react-redux'
import { setWeeks } from '../../store/lifeSlice'
import { generateWeeks } from '../../utils/generateWeeks'
import { getAverageMoodColor } from '../../utils/getColorByMood'

import LifeStageBlock from '../../components/LifeStageBlock/LifeStageBlock'
import Spinner from '../../components/Spinner/Spinner'


const Calendar = () => {
  const { dateOfBirth, estimatedDeathDate, firstUsageDate } = useSelector((state) => state.profile)
  const weeks = useSelector((state) => state.life.weeks)
  const weekDetails = useSelector((state) => state.weekDetails)

  const dispatch = useDispatch()

  const isReady = useRenderReady(weeks.length > 0)

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
  const grouped = useMemo(() => {
    return weeks.reduce((acc, week) => {
      const stage = week.stage
  
      if (!acc[week.stage]) 
        acc[week.stage] = []
  
      // формат ключа: YYYY-MM-DD
      const key = week.startDate.slice(0, 10)
      const weekData = weekDetails[key]
      const averageMoodColor = getAverageMoodColor(weekData)
  
      acc[stage].push({...week, averageMoodColor,})
      return acc
    }, {})
  }, [weeks, weekDetails])


  return (
    <div className="life-calendar">
      {!isReady ? (<Spinner strInfo={'жизнь'}/>
        ) : (
          Object.entries(grouped).map(([stage, weeks]) => (
          <LifeStageBlock key={stage} title={stage} weeks={weeks} />)))}
    </div>
  )
}

export default React.memo(Calendar)
