import { useRef, useState, useEffect, useCallback } from 'react'
import usePunchCardStore from './store/usePunchCardStore'
import { useStampAnimation } from './hooks/useStampAnimation'
import { todayStr } from './utils/dateUtils'
import AppHeader from './components/AppHeader/AppHeader'
import PunchCard from './components/PunchCard/PunchCard'
import EventPanel from './components/EventPanel/EventPanel'
import CheckInPanel from './components/CheckInPanel/CheckInPanel'
import AchievementBadges from './components/AchievementBadges/AchievementBadges'
import StampAnimation from './components/StampAnimation/StampAnimation'
import SettingsModal from './components/SettingsModal/SettingsModal'
import ShareButton from './components/ShareButton/ShareButton'
import styles from './App.module.css'

export default function App() {
  const cardRef = useRef(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const {
    companyName, jobTitle, targetDate,
    stamps, eventCountMap,
    lastCheckIn, streak,
    unlockedAchievements, newlyUnlocked,
    addEventStamp, addCheckIn,
    updateProfile, clearNewAchievements,
    resetAllData, checkStreakOnLoad,
    getStampsOnCurrentCard, getCardPage,
  } = usePunchCardStore()

  const { isPlaying, currentEvent, startAnimation, stopAnimation } = useStampAnimation()

  useEffect(() => {
    checkStreakOnLoad()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStamp = useCallback((event) => {
    if (isPlaying) return
    addEventStamp(event.id)
    startAnimation(event)
  }, [isPlaying, addEventStamp, startAnimation])

  const handleCheckIn = useCallback(() => {
    addCheckIn()
    startAnimation({ emoji: '📅', label: '每日打卡' })
  }, [addCheckIn, startAnimation])

  const hasCheckedInToday = lastCheckIn === todayStr()
  const stampsOnCard = getStampsOnCurrentCard()
  const cardPage = getCardPage()

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
          stamps={stampsOnCard}
          cardPage={cardPage}
          companyName={companyName}
          jobTitle={jobTitle}
          totalStamps={stamps.length}
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
          onStamp={handleStamp}
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
