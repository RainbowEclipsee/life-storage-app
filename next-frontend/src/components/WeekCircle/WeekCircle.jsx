'use client'

import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { format, parseISO } from 'date-fns'
import { useRouter } from 'next/navigation'
import styles from './WeekCircle.module.css'

export default function WeekCircle({ startDate, endDate, isPast, averageMoodColor }) {
  const router = useRouter()
  const tooltipId = `tooltip-${startDate}`
  const tooltipText = `${format(parseISO(startDate), 'dd.MM.yyyy')} – ${format(parseISO(endDate), 'dd.MM.yyyy')}`

  const bgColor = averageMoodColor ?? (isPast ? '#555' : '#ddd')

  const handleClick = () => {
    router.push(`/week/${startDate.slice(0, 10)}`)
  }

  return (
    <div className={styles.wrapper} data-week={startDate} aria-label={`Неделя ${startDate}`}>
      <div
        id={tooltipId}
        className={`${styles.weekCircle} week-dot`}
        style={{ backgroundColor: bgColor, cursor: 'pointer' }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
      />
      <Tooltip anchorId={tooltipId} content={tooltipText} delayShow={0} delayHide={0} />
    </div>
  )
}
