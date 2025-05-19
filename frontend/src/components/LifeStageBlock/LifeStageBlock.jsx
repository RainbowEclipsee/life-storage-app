import React from 'react'
import WeekCircle from '../weekCircle/WeekCircle'
import './LifeStageBlock.css'

const LifeStageBlock = ({ title, weeks }) => {
  return (
    <div className="stage-block">
      <h3>{title}</h3>
      <div className="week-grid">
        {weeks.map((week) => (
          <WeekCircle
            key={week.id}
            isPast={week.isPast}
            startDate={week.startDate}
            endDate={week.endDate}
          />
        ))}
      </div>
    </div>
  )
}

export default LifeStageBlock
