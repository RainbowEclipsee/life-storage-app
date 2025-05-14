import { differenceInCalendarWeeks, eachWeekOfInterval, parseISO, isBefore, isAfter } from 'date-fns'

const getLifeStage = (age) => {
  if (age < 4) return 'Раннее детство'
  if (age < 14) return 'Детство'
  if (age < 18) return 'Подростковый возраст'
  if (age < 35) return 'Молодость'
  if (age < 60) return 'Зрелость'
  return 'Старость'
}

export const generateWeeks = ({ dateOfBirth, estimatedDeathDate, firstUsageDate }) => {
  const start = parseISO(dateOfBirth)
  const end = parseISO(estimatedDeathDate)
  const firstUsage = parseISO(firstUsageDate)
  const now = new Date()

  const allWeeks = eachWeekOfInterval({ start, end })

  return allWeeks.map((weekStartDate) => {
    const ageAtThisWeek = differenceInCalendarWeeks(weekStartDate, start) / 52
    return {
      date: weekStartDate.toISOString().split('T')[0],
      stage: getLifeStage(ageAtThisWeek),
      isPast: isBefore(weekStartDate, now),
      isFromUsage: isAfter(weekStartDate, firstUsage),
    }
  })
}
