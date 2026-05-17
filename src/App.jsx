import { useRef, useState, useEffect, useCallback } from 'react'
import usePunchCardStore, { SLOTS_PER_CARD } from './store/usePunchCardStore'
import { useStampAnimation } from './hooks/useStampAnimation'
import { todayStr } from './utils/dateUtils'
import AppHeader from './components/AppHeader/AppHeader'
import PunchCard from './components/PunchCard/PunchCard'
import EventPanel from './components/EventPanel/EventPanel'
import CheckInPanel from './components/CheckInPanel/CheckInPanel'
import AchievementBadges from './components/AchievementBadges/AchievementBadges'
import StampAnimation from './components/StampAnimation/StampAnimation'
import StampInputModal from './components/StampInputModal/StampInputModal'
import StampDetailModal from './components/StampDetailModal/StampDetailModal'
import CustomEventModal from './components/CustomEventModal/CustomEventModal'
import SettingsModal from './components/SettingsModal/SettingsModal'
import ShareButton from './components/ShareButton/ShareButton'
import styles from './App.module.css'

export default function App() {
  const cardRef = useRef(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [stampInputEvent, setStampInputEvent] = useState(null)
  const [detailStamp, setDetailStamp] = useState(null)
  const [customEventOpen, setCustomEventOpen] = useState(false)
  const [viewingPage, setViewingPage] = useState(1)

  const {
    companyName, jobTitle, targetDate,
    stamps, eventCountMap, customEvents,
    lastCheckIn, streak,
    unlockedAchievements, newlyUnlocked,
    addEventStamp, addCheckIn,
    addCustomEvent, removeCustomEvent,
    updateProfile, clearNewAchievements,
    resetAllData, checkStreakOnLoad,
    getTotalPages, getStampsOnPage, getCurrentPage,
  } = usePunchCardStore()

  const { isPlaying, currentEvent, startAnimation, stopAnimation } = useStampAnimation()

  useEffect(() => {
    checkStreakOnLoad()
  }, []) // eslint-disable-line

  // When stamps change, jump to the latest page
  useEffect(() => {
    const latest = getCurrentPage()
    setViewingPage(latest)
  }, [stamps.length]) // eslint-disable-line

  const handleEventClick = useCallback((event) => {
    if (isPlaying) return
    setStampInputEvent(event)
  }, [isPlaying])

  const handleStampConfirm = useCallback((event, date, note) => {
    setStampInputEvent(null)
    addEventStamp(event.id, date, note)
    startAnimation(event)
  }, [addEventStamp, startAnimation])

  const handleCheckIn = useCallback(() => {
    addCheckIn()
    startAnimation({ emoji: '💾', label: '每日存檔' })
  }, [addCheckIn, startAnimation])

  const handleSlotClick = useCallback((stamp) => {
    setDetailStamp(stamp)
  }, [])

  const handleAddCustomEvent = useCallback((emoji, label) => {
    addCustomEvent(emoji, label)
    setCustomEventOpen(false)
  }, [addCustomEvent])

  const totalPages = getTotalPages()
  const stampsOnPage = getStampsOnPage(viewingPage)
  const hasCheckedInToday = lastCheckIn === todayStr()

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <AppHeader
          companyName={companyName}
          jobTitle={jobTitle}
          targetDate={targetDate}
          totalStamps={stamps.length}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        <PunchCard
          ref={cardRef}
          stamps={stampsOnPage}
          viewingPage={viewingPage}
          totalPages={totalPages}
          totalStamps={stamps.length}
          companyName={companyName}
          jobTitle={jobTitle}
          onPrevPage={() => setViewingPage(p => Math.max(1, p - 1))}
          onNextPage={() => setViewingPage(p => Math.min(totalPages, p + 1))}
          onSlotClick={handleSlotClick}
          customEvents={customEvents}
        />

        <ShareButton cardRef={cardRef} />

        <CheckInPanel
          streak={streak}
          hasCheckedInToday={hasCheckedInToday}
          onCheckIn={handleCheckIn}
          disabled={isPlaying}
        />

        <EventPanel
          eventCountMap={eventCountMap}
          customEvents={customEvents}
          onStamp={handleEventClick}
          onAddCustom={() => setCustomEventOpen(true)}
          onRemoveCustom={removeCustomEvent}
          disabled={isPlaying}
        />

        <AchievementBadges
          unlockedIds={unlockedAchievements}
          newlyUnlocked={newlyUnlocked}
          onClearNew={clearNewAchievements}
        />
      </div>

      <StampAnimation
        isPlaying={isPlaying}
        currentEvent={currentEvent}
        onComplete={stopAnimation}
      />

      <StampInputModal
        event={stampInputEvent}
        onConfirm={handleStampConfirm}
        onCancel={() => setStampInputEvent(null)}
      />

      <StampDetailModal
        stamp={detailStamp}
        customEvents={customEvents}
        onClose={() => setDetailStamp(null)}
      />

      <CustomEventModal
        isOpen={customEventOpen}
        onSave={handleAddCustomEvent}
        onCancel={() => setCustomEventOpen(false)}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        initialValues={{ companyName, jobTitle, targetDate }}
        onSave={updateProfile}
        onReset={resetAllData}
      />
    </div>
  )
}
