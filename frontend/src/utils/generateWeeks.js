import { 
  differenceInCalendarWeeks, 
  eachWeekOfInterval, 
  parseISO, 
  isBefore, 
  isAfter, 
  addDays, 
  startOfWeek 
} from 'date-fns'
// import { ru } from 'date-fns/locale';


const getLifeStage = (age) => {
  if (age < 4) return 'Раннее детство'
  if (age < 14) return 'Детство'
  if (age < 18) return 'Подростковый возраст'
  if (age < 35) return 'Молодость'
  if (age < 60) return 'Зрелость'
  return 'Старость'
}

export const generateWeeks = ({ dateOfBirth, estimatedDeathDate, firstUsageDate }) => {
  const engWeekStart = parseISO(dateOfBirth)
  const end = parseISO(estimatedDeathDate)
  const firstUsage = parseISO(firstUsageDate)
  const now = new Date()

  // Приводим дату рождения к ближайшему предыдущему понедельнику.
  // Потому что считает по американскому календарю
  const start = startOfWeek(engWeekStart, { weekStartsOn: 1 })
  // const start = startOfWeek(engWeekStart, {locale: ru})

  // Генерируем недели с понедельника
  const allWeeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 })
  // const allWeeks = eachWeekOfInterval({ start, end }, {locale: ru})

  return allWeeks.map((weekStartDate, index) => {
    const ageAtThisWeek = differenceInCalendarWeeks(weekStartDate, start) / 52
    return {
      id: index,
      startDate: weekStartDate.toISOString(), 
      endDate: addDays(weekStartDate, 6).toISOString(),
      stage: getLifeStage(ageAtThisWeek),
      isPast: isBefore(weekStartDate, now),
      isFromUsage: isAfter(weekStartDate, firstUsage),
    }
  })
}