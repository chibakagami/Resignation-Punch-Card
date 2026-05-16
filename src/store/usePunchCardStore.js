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
  lastCheckIn: null,
  streak: 0,
  unlockedAchievements: [],
  newlyUnlocked: [],
}

const usePunchCardStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      addEventStamp(eventId) {
        set(state => {
          const newStamp = {
            id: nanoid(),
            eventId,
            timestamp: new Date().toISOString(),
            type: 'event',
          }
          const newStamps = [...state.stamps, newStamp]
          const newEventCountMap = {
            ...state.eventCountMap,
            [eventId]: (state.eventCountMap[eventId] || 0) + 1,
          }
          const nextState = {
            ...state,
            stamps: newStamps,
            eventCountMap: newEventCountMap,
          }
          const newlyUnlocked = checkNewAchievements(nextState, state.unlockedAchievements)
          return {
            stamps: newStamps,
            eventCountMap: newEventCountMap,
            unlockedAchievements: [...state.unlockedAchievements, ...newlyUnlocked],
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
          }
          const newStamps = [...st.stamps, newStamp]
          const nextState = {
            ...st,
            stamps: newStamps,
            streak: newStreak,
            lastCheckIn: today,
          }
          const newlyUnlocked = checkNewAchievements(nextState, st.unlockedAchievements)
          return {
            stamps: newStamps,
            lastCheckIn: today,
            streak: newStreak,
            unlockedAchievements: [...st.unlockedAchievements, ...newlyUnlocked],
            newlyUnlocked: [...st.newlyUnlocked, ...newlyUnlocked],
          }
        })
      },

      updateProfile(companyName, jobTitle, targetDate) {
        set(state => {
          const nextState = { ...state, companyName, jobTitle, targetDate }
          const newlyUnlocked = checkNewAchievements(nextState, state.unlockedAchievements)
          return {
            companyName,
            jobTitle,
            targetDate,
            unlockedAchievements: [...state.unlockedAchievements, ...newlyUnlocked],
            newlyUnlocked: [...state.newlyUnlocked, ...newlyUnlocked],
          }
        })
      },

      clearNewAchievements() {
        set({ newlyUnlocked: [] })
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

      getSlotsOnCurrentCard() {
        const { stamps } = get()
        const count = stamps.length
        const remainder = count % SLOTS_PER_CARD
        return remainder === 0 && count > 0 ? SLOTS_PER_CARD : remainder
      },

      getCardPage() {
        const { stamps } = get()
        const count = stamps.length
        if (count === 0) return 1
        const remainder = count % SLOTS_PER_CARD
        return remainder === 0 ? Math.floor(count / SLOTS_PER_CARD) : Math.floor(count / SLOTS_PER_CARD) + 1
      },

      getStampsOnCurrentCard() {
        const { stamps } = get()
        const count = stamps.length
        if (count === 0) return []
        const remainder = count % SLOTS_PER_CARD
        const sliceFrom = remainder === 0 ? count - SLOTS_PER_CARD : count - remainder
        return stamps.slice(sliceFrom)
      },
    }),
    {
      name: 'punch-card-v1',
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          return { ...initialState, ...persistedState, eventCountMap: persistedState.eventCountMap || {} }
        }
        return persistedState
      },
    }
  )
)

export default usePunchCardStore
export { SLOTS_PER_CARD }
