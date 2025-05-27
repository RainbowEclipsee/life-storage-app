import { startOfWeek, format } from 'date-fns'

export const getCurrentWeekStart = () => {
  const now = new Date()
  const monday = startOfWeek(now, { weekStartsOn: 0 })
  return format(monday, 'yyyy-MM-dd') 
}
