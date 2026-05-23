import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { ACHIEVEMENTS } from '../constants/achievements'
import { todayStr, daysBetween } from '../utils/dateUtils'

const SLOTS_PER_CARD = 30

function checkNewAchievements(state, prevUnlocked) {
  const newlyUnlocked = []
  for (const achievement of ACHIEVEMENTS) {
    if (!prevUnlocked.includes(achievement.id) && achievement.condition(state)) {
      newlyUnlocked.push(achievement.id)
    }
  }
  return newlyUnlocked
}

const initialState = {
  companyName: '',
  jobTitle: '',
  targetDate: null,
  stamps: [],
  eventCountMap: {},
  customEvents: [],
  lastCheckIn: null,
  streak: 0,
  unlockedAchievements: [],
  achievementDates: {},   // { [achievementId]: 'YYYY-MM-DD' }
  newlyUnlocked: [],
  hasOnboarded: false,
}

const usePunchCardStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      addEventStamp(eventId, date, note) {
        set(state => {
          const newStamp = {
            id: nanoid(),
            eventId,
            timestamp: new Date().toISOString(),
            type: 'event',
            date: date || todayStr(),
            note: note || '',
          }
          const newStamps = [...state.stamps, newStamp]
          const newEventCountMap = {
            ...state.eventCountMap,
            [eventId]: (state.eventCountMap[eventId] || 0) + 1,
          }
          const nextState = { ...state, stamps: newStamps, eventCountMap: newEventCountMap }
          const newlyUnlocked = checkNewAchievements(nextState, state.unlockedAchievements)
          const today = todayStr()
          const newDates = Object.fromEntries(newlyUnlocked.map(id => [id, today]))
          return {
            stamps: newStamps,
            eventCountMap: newEventCountMap,
            unlockedAchievements: [...state.unlockedAchievements, ...newlyUnlocked],
            achievementDates: { ...state.achievementDates, ...newDates },
            newlyUnlocked: [...state.newlyUnlocked, ...newlyUnlocked],
          }
        })
      },

      addCheckIn() {
        const state = get()
        const today = todayStr()
        if (state.lastCheckIn === today) return

        set(st => {
          const dayDiff = st.lastCheckIn ? daysBetween(today, st.lastCheckIn) : 999
          const newStreak = dayDiff === 1 ? st.streak + 1 : 1
          const newStamp = {
            id: nanoid(),
            eventId: 'daily_checkin',
            timestamp: new Date().toISOString(),
            type: 'checkin',
            date: today,
            note: '',
          }
          const newStamps = [...st.stamps, newStamp]
          const nextState = { ...st, stamps: newStamps, streak: newStreak, lastCheckIn: today }
          const newlyUnlocked = checkNewAchievements(nextState, st.unlockedAchievements)
          const newDates = Object.fromEntries(newlyUnlocked.map(id => [id, today]))
          return {
            stamps: newStamps,
            lastCheckIn: today,
            streak: newStreak,
            unlockedAchievements: [...st.unlockedAchievements, ...newlyUnlocked],
            achievementDates: { ...st.achievementDates, ...newDates },
            newlyUnlocked: [...st.newlyUnlocked, ...newlyUnlocked],
          }
        })
      },

      addCustomEvent(emoji, label, color) {
        const id = `custom_${nanoid(6)}`
        set(state => ({
          customEvents: [...state.customEvents, { id, emoji, label, color: color || '#888888' }],
        }))
        return id
      },

      removeCustomEvent(id) {
        set(state => ({
          customEvents: state.customEvents.filter(e => e.id !== id),
        }))
      },

      updateProfile(companyName, jobTitle, targetDate) {
        set(state => {
          const nextState = { ...state, companyName, jobTitle, targetDate }
          const newlyUnlocked = checkNewAchievements(nextState, state.unlockedAchievements)
          const newDates = Object.fromEntries(newlyUnlocked.map(id => [id, todayStr()]))
          return {
            companyName, jobTitle, targetDate,
            unlockedAchievements: [...state.unlockedAchievements, ...newlyUnlocked],
            achievementDates: { ...state.achievementDates, ...newDates },
            newlyUnlocked: [...state.newlyUnlocked, ...newlyUnlocked],
          }
        })
      },

      clearNewAchievements() {
        set({ newlyUnlocked: [] })
      },

      completeOnboarding(companyName, jobTitle, targetDate) {
        set(state => {
          const nextState = { ...state, companyName, jobTitle, targetDate, hasOnboarded: true }
          const newlyUnlocked = checkNewAchievements(nextState, state.unlockedAchievements)
          const newDates = Object.fromEntries(newlyUnlocked.map(id => [id, todayStr()]))
          return {
            companyName, jobTitle, targetDate,
            hasOnboarded: true,
            unlockedAchievements: [...state.unlockedAchievements, ...newlyUnlocked],
            achievementDates: { ...state.achievementDates, ...newDates },
            newlyUnlocked: [...state.newlyUnlocked, ...newlyUnlocked],
          }
        })
      },

      resetAllData() {
        set({ ...initialState })
      },

      checkStreakOnLoad() {
        set(state => {
          if (!state.lastCheckIn) return {}
          const today = todayStr()
          if (state.lastCheckIn === today) return {}
          const dayDiff = daysBetween(today, state.lastCheckIn)
          if (dayDiff > 1) return { streak: 0 }
          return {}
        })
      },

      getTotalPages() {
        const { stamps } = get()
        return Math.max(1, Math.ceil(stamps.length / SLOTS_PER_CARD))
      },

      getStampsOnPage(page) {
        const { stamps } = get()
        const start = (page - 1) * SLOTS_PER_CARD
        return stamps.slice(start, start + SLOTS_PER_CARD)
      },

      getCurrentPage() {
        const { stamps } = get()
        if (stamps.length === 0) return 1
        return Math.ceil(stamps.length / SLOTS_PER_CARD)
      },
    }),
    {
      name: 'punch-card-v1',
      version: 3,
      migrate: (persistedState, version) => {
        const base = { ...initialState, ...persistedState }
        if (version < 2) {
          base.customEvents = base.customEvents || []
          base.stamps = (base.stamps || []).map(s => ({
            ...s,
            date: s.date || (s.timestamp ? s.timestamp.substring(0, 10) : todayStr()),
            note: s.note || '',
          }))
        }
        base.achievementDates = base.achievementDates || {}
        // existing users (version < 3) are considered already onboarded
        if (version < 3) {
          base.hasOnboarded = !!(base.companyName || base.stamps?.length > 0)
        }
        return base
      },
    }
  )
)

export default usePunchCardStore
export { SLOTS_PER_CARD }
