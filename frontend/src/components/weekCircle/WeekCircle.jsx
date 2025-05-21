import React from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import './WeekCircle.css'

export default function WeekCircle({ startDate, endDate, isPast, averageMoodColor }) {
  const tooltipId = `tooltip-${startDate}`
  const tooltipText = `${format(new Date(startDate), 'dd.MM.yyyy')} – ${format(
    new Date(endDate),
    'dd.MM.yyyy'
  )}`

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/week/${startDate}`)
  }

  return (
    <div>
      <div
        id={tooltipId}
        className="week-circle"
        style={{ backgroundColor: averageMoodColor ? averageMoodColor : isPast ? '#555': '#ddd', cursor: 'pointer',}}
        onClick={handleClick}
      />
      <Tooltip anchorId={tooltipId} content={tooltipText} delayShow={0} delayHide={0} />
    </div>
  )
}
