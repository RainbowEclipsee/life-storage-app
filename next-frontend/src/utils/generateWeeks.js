import { 
  differenceInCalendarWeeks, 
  eachWeekOfInterval, 
  parseISO, 
  isBefore, 
  isAfter, 
  addDays, 
  startOfWeek,
  format,
} from 'date-fns'
import { ru } from 'date-fns/locale';


const getLifeStage = (age) => {
  if (age < 4) return 'Раннее детство'
  if (age < 14) return 'Детство'
  if (age < 18) return 'Подростковый возраст'
  if (age < 35) return 'Молодость'
  if (age < 60) return 'Зрелость'
  return 'Старость'
}

export const generateWeeks = ({ dateOfBirth, estimatedDeathDate, firstUsageDate }) => {
  const birthDate = parseISO(dateOfBirth)
  const endDate = parseISO(estimatedDeathDate)
  const firstUsage = parseISO(firstUsageDate)
  const now = new Date()

  // Начало жизни: понедельник (русская локаль) 
  // TODO - добавить смену формата исчисление календаря под eng (исходя из выбора языковой темы ru / eng)
  const start = startOfWeek(birthDate, { locale: ru })

  const allWeeks = eachWeekOfInterval({ start, end: endDate }, { locale: ru })

  return allWeeks.map((weekStartDate, index) => {
    const ageAtThisWeek = differenceInCalendarWeeks(weekStartDate, start) / 52
    const weekStartKey = format(weekStartDate, 'yyyy-MM-dd')
    const weekEndKey = format(addDays(weekStartDate, 6), 'yyyy-MM-dd')
    return {
      id: index,
      startDate: weekStartKey, 
      endDate: weekEndKey,
      stage: getLifeStage(ageAtThisWeek),
      isPast: isBefore(weekStartDate, now),
      isFromUsage: isAfter(weekStartDate, firstUsage),
    }
  })
}