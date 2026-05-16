import { format, differenceInCalendarDays, parseISO } from 'date-fns'

export function todayStr() {
  return format(new Date(), 'yyyy-MM-dd')
}

export function isSameDayStr(a, b) {
  if (!a || !b) return false
  return a === b
}

export function daysBetween(dateStrA, dateStrB) {
  return differenceInCalendarDays(parseISO(dateStrA), parseISO(dateStrB))
}

export function daysUntil(dateStr) {
  if (!dateStr) return null
  return differenceInCalendarDays(parseISO(dateStr), new Date())
}
