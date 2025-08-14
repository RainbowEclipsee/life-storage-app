import { startOfWeek, format } from 'date-fns'
import { ru } from 'date-fns/locale';

export const getCurrentWeekStart = () => {
  const now = new Date()
  const monday = startOfWeek(now, { locale: ru })
  return format(monday, 'yyyy-MM-dd') 
}