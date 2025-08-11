import React from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import './WeekCircle.css'

const WeekCircle = ({ startDate, endDate, isPast, averageMoodColor }) => {
  const tooltipId = `tooltip-${startDate}`
  const tooltipText = `${format(new Date(startDate), 'dd.MM.yyyy')} – ${format(
    new Date(endDate),
    'dd.MM.yyyy'
  )}`

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/week/${startDate.slice(0, 10)}`)
  }

  const bgColor = averageMoodColor ?? (isPast ? '#555' : '#ddd')

  return (
    <div>
      <div
        id={tooltipId}
        className="week-circle"
        style={{backgroundColor: bgColor, cursor: 'pointer'}}
        onClick={handleClick}
        // Подумать над логикой. Если неделя еще не прошла, то доступна / нет для ведения и заполнения
        // Из проблем - можно перейти по url к будущей неделе
        // style={{backgroundColor: bgColor, cursor: isPast ? 'pointer' : 'default',}}
        // onClick={isPast ? handleClick : null}

        // TODO - Решение. Если неделя еще не наступила, но в ней заметка - 
        // обводить круг, но нельзя редактировать Настроение внутри WeekDetail
      />
      <Tooltip anchorId={tooltipId} content={tooltipText} delayShow={0} delayHide={0} />
    </div>
  )
}

export default WeekCircle