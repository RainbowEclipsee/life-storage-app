import React from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import './WeekCircle.css'
import { format } from 'date-fns'

const WeekCircle = ({ isPast, startDate, endDate }) => {
  const tooltipId = `tooltip-${startDate}`
  const tooltipText = `${format(new Date(startDate), 'dd.MM.yyyy')} – ${format(new Date(endDate),'dd.MM.yyyy')}`

  return (
    <div>
      <div
        id={tooltipId}
        className="week-circle"
        style={{
          backgroundColor: isPast ? '#555' : '#ddd',
        }}
      />
      <Tooltip
        anchorId={tooltipId}
        content={tooltipText}
        delayShow={0}
        delayHide={0}
      />
    </div>
  )
}

export default WeekCircle
